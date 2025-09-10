// import db from '../modules/index.js';

// const { auth: Auth } = db;

// const findByEmailService = async (email) => {
//     try {
//         // const response = await Auth.findOne({ email }).exec();
//         const response = await Auth.findOne({ where: { email } })
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// const userRregisteredServices = async (payload) => {
//     try {
//         const response = await Auth({ ...payload });
//         return await response.save()
//     } catch (error) {
//         throw error;
//     }
// }

// const getAllUserDataServices = async () => {
//     try {
//         const response = await Auth.find();
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// const getCurrentUserDataServices = async (_id) => {
//     try {
//         const response = await Auth.findById({ _id });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// const deleteUserAccountService = async (id) => {
//     try {
//         const response = await Auth.findByIdAndDelete({ _id: id })
//         return response
//     } catch (error) {
//         throw error;
//     }
// };

// const updateUserPasswordServices = async (_id, password,original_password) => {
//     try {
//         const resposne = await Auth.findByIdAndUpdate(
//             _id,
//             { password, first: true,original_password },
//             { new: true }
//         )
//         return resposne
//     } catch (error) {
//         throw error;
//     }
// }

// const automaticallyesetPassordServices=async(_id,password)=>{
//     try {
//         const resposne = await Auth.findByIdAndUpdate(
//             _id,
//             { password, first: false },
//             { new: true }
//         )
//         return resposne
//     } catch (error) {
//         throw error;
//     }
// }


// const userUsedInDesktopServices=async(_id)=>{
//     try {
//         const resposne = await Auth.findByIdAndUpdate(
//             _id,
//             { desktop: false },
//             { new: true }
//         )
//         return resposne
//     } catch (error) {
//         throw error;
//     }
// }


// export {
//     findByEmailService,
//     userRregisteredServices,
//     getAllUserDataServices,
//     deleteUserAccountService,
//     getCurrentUserDataServices,
//     updateUserPasswordServices,
//     automaticallyesetPassordServices,
//     userUsedInDesktopServices
// }

import db from '../modules/index.js';
const { auth: Auth } = db;

// Find user by email
const findByEmailService = async (email) => {
    try {
        const response = await Auth.findOne({ where: { email } });
        return response;
    } catch (error) {
        throw error;
    }
};

// Register new user
const userRregisteredServices = async (payload) => {
    try {
        const response = await Auth.create({ ...payload });
        return response;
    } catch (error) {
        throw error;
    }
};

// Get all users
const getAllUserDataServices = async () => {
    try {
        const response = await Auth.findAll();
        return response;
    } catch (error) {
        throw error;
    }
};

// Get current user by ID
const getCurrentUserDataServices = async (id) => {
    try {
        const response = await Auth.findByPk(id);
        return response;
    } catch (error) {
        throw error;
    }
};

// Delete user account by ID
const deleteUserAccountService = async (id) => {
    try {
        const response = await Auth.destroy({ where: { id } });
        return response;
    } catch (error) {
        throw error;
    }
};

// // Update user password
// const updateUserPasswordServices = async (id, password, original_password) => {
//     try {
//         const response = await Auth.update(
//             { password, first: true, original_password },
//             { where: { id }, returning: true }
//         );
//         console.log(response)
//         return response[1][0]; // returning updated row
//     } catch (error) {
//         throw error;
//     }
// };

const updateUserPasswordServices = async (id, password, original_password) => {
    try {
        // Update the row
        await Auth.update(
            { password, first: true, original_password },
            { where: { id } }
        );

        // Fetch the updated row manually
        const updatedUser = await Auth.findOne({ where: { id } });
        return updatedUser;

    } catch (error) {
        throw error;
    }
};

// Automatically reset password
const automaticallyesetPassordServices = async (id, password) => {
    try {
        const response = await Auth.update(
            { password, first: false },
            { where: { id }, returning: true }
        );
        return response[1][0];
    } catch (error) {
        throw error;
    }
};

// Update desktop usage
const userUsedInDesktopServices = async (id) => {
    try {
        const response = await Auth.update(
            { desktop: false },
            { where: { id }, returning: true }
        );
        return response[1][0];
    } catch (error) {
        throw error;
    }
};
export {
    findByEmailService,
    userRregisteredServices,
    getAllUserDataServices,
    deleteUserAccountService,
    getCurrentUserDataServices,
    updateUserPasswordServices,
    automaticallyesetPassordServices,
    userUsedInDesktopServices
}
