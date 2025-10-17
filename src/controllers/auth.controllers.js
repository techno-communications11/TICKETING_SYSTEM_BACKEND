import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { automaticallyesetPassordServices, changePasswordService, deleteMultipleUserAccountService, deleteUserAccountService, findByEmailService, findByMultipleEmailService, getAllUserDataServices, updateUserPasswordServices, updateUserService, userBulkRegisterService, userRregisteredServices, userUsedInDesktopServices } from "../Servicess/auth.services.js";
import serverConfig from '../config/server.config.js';
import { saveLogsServices } from '../Servicess/logs.services.js';
import axios from 'axios';

const registered = async (req, res) => {
    try {
        const { signupData } = req.body;
        if (!signupData) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid request, signupData is required"
            });
        }
        const { name, email, password, phone, department, subDepartment, doorcode, markets, stores, store_detail, managedDepartments } = signupData;
        const existingUser = await findByEmailService(email);
        if (existingUser) {
            return res.status(409).json({
                status: 401,
                error: 'User already exists',
                message: "The username or email is already taken. Please choose another."
            });
        }
        const hashpass = await bcrypt.hash(password, 10);
        const obj = {
            name,
            email,
            password: hashpass,
            original_password: password,
            phone,
            department,
            subDepartment,
            doorcode,
            markets,
            stores,
            store_detail,
            managedDepartments
        };
        const response = await userRregisteredServices(obj);
        const token = jwt.sign({ department: response.department, subDepartment: response.subDepartment, name: response.name, doorcode: response.doorcode, store_detail: response.store_detail, managedDepartments }, serverConfig.secretKey);
        return res.status(200).json({
            status: "200",
            success: true,
            message: "successfully registered",
            data: response,
            token: token,
            id: response._id
        });
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({
            status: "500",
            success: false,
            message: "internal server error",
            errormessage: error.message
        });
    }
};
const MultipleRegistered = async (req, res) => {
    try {
        const { signupData } = req.body;

        if (!signupData || !Array.isArray(signupData) || signupData.length === 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid request. signupData should be a non-empty array.",
            });
        }

        // ✅ Check for existing users first
        const emails = signupData.map((u) => u.email);
        const existingUsers = await findByMultipleEmailService(emails);

        if (existingUsers.length > 0) {
            const existingEmails = existingUsers.map((u) => u.email);
            return res.status(409).json({
                status: 409,
                success: false,
                message: "Some users already exist with these emails.",
                existingEmails,
            });
        }

        // ✅ Hash passwords for all users
        const usersToCreate = await Promise.all(
            signupData.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
                original_password: user.password,
            }))
        );

        // ✅ Save all users via service
        const createdUsers = await userBulkRegisterService(usersToCreate);

        // ✅ Generate tokens for each user (optional)
        const tokens = createdUsers.map((user) =>
            jwt.sign(
                {
                    department: user.department,
                    subDepartment: user.subDepartment,
                    name: user.name,
                    doorcode: user.doorcode,
                    store_detail: user.store_detail,
                    managedDepartments: user.managedDepartments,
                },
                serverConfig.secretKey
            )
        );

        return res.status(201).json({
            status: 201,
            success: true,
            message: "Users registered successfully",
            data: createdUsers,
            tokens,
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error",
            errormessage: error.message,
        });
    }
};
const login = async (req, res) => {
    try {
        // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // console.log("IP FOR DECTEC LOCATION", ip)
        const { login } = req.body;
        // console.log("login", login)
        const { email, password, ip } = login;
        // console.log("IP", ip)
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email and password are required"
            });
        }
        const existingUser = await findByEmailService(email);
        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign(
            {
                department: existingUser.department,
                subDepartment: existingUser.subDepartment,
                name: existingUser.name,
                doorcode: existingUser.doorcode,
                first: existingUser.first,
            },
            process.env.JWT_SECRET || "defaultSecretKey",
            { expiresIn: "1h" }
        );
        const userAgent = req.useragent;
        let locationInfo = {};
        try {
            const response = await axios.get(`https://ipapi.co/${ip}/json/`);
            locationInfo = response.data;
        } catch (error) {
            console.error('Location fetch error:', error.message);
            locationInfo = { city: "Unknown", country_name: "Unknown" };
        }
        const logsData = {
            date: new Date(),
            time: new Date().toLocaleTimeString(),
            user: existingUser.id,
            data: existingUser,
            status: "success",
            ip: ip,
            browser: userAgent.browser,
            os: userAgent.os,
            device: userAgent.platform,
            location: `${locationInfo.city}, ${locationInfo.country_name}`, // For now, leave this empty or integrate GeoIP later
            description: "login"
        }
        // console.log("logsdata", logsData)
        // console.log("location", locationInfo.city, locationInfo.country_name, locationInfo)
        const response = await saveLogsServices(logsData);
        // console.log(response)
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Login successful",
            token: token,
            id: existingUser.id,
            data: existingUser,
            forgotpassword: existingUser?.forgotpassword
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateUserPasswordController = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        if (!userId || !newPassword) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User ID aur new password required hain"
            });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);
        const original_password = newPassword;
        const response = await updateUserPasswordServices(userId, hashPass, original_password);

        if (!response) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User nahi mila ya password update nahi hua"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Password successfully update ho gaya"
        });

    } catch (error) {
        console.error("Password update error:", error.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await getAllUserDataServices();
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Users fetched successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteUserAccountService(id)
        return res.status(200).json({ status: 200, success: true, message: "success" })
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "internal ser ver error", error: error.message })
    }
}
const deleteMultipleUser = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        const response = await deleteMultipleUserAccountService(id);
        console.log(response)
        return res.status(200).json({ status: 200, success: true, message: "success" })
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "internal ser ver error", error: error.message })
    }
}

const resetUserPasswordAutomaticallyController = async (req, res) => {
    try {
        const { userId } = req.body;
        const password = '123456'
        const hashpass = await bcrypt.hash(password, 10);
        const resposne = await automaticallyesetPassordServices(userId, hashpass);
        return res.status(200).json({ status: 200, sucess: true, message: "password reset successfully", data: resposne });
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "server error", error: error.message });
    }
}

const userUsedInDesktopController = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await userUsedInDesktopServices(id);
        return res.status(200).json({ status: 200, sucess: true, message: "user used in desktop successfully", data: response });
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "server error", error: error.message });
    }
}

const userUpdateController = async (req, res) => {
    try {
        const { id, data } = req.body;
        await updateUserService(id, data);
        return res.status(200).json({ status: 200, sucess: true, message: "user used in desktop successfully" });

    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "server error", error: error.message });
    }
}
// Change Password Controller
const changePasswordController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check required fields
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email and password are required",
            });
        }

        // check user exist
        const isExisting = await findByEmailService(email);
        if (!isExisting) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
        }

        // hash new password
        const hashPass = await bcrypt.hash(password, 10);

        // update password in DB
        await changePasswordService(isExisting.id, hashPass);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.log("ERROR", error.message);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export {
    registered,
    login,
    getAllUsers,
    deleteUser,
    updateUserPasswordController,
    resetUserPasswordAutomaticallyController,
    userUsedInDesktopController,
    userUpdateController,
    changePasswordController,
    MultipleRegistered,
    deleteMultipleUser
}