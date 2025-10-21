import db from '../modules/index.js';
const { auth: Auth } = db;
const findByEmailService = async (email) => {
    try {
        const response = await Auth.findOne({ where: { email } });
        return response;
    } catch (error) {
        throw error;
    }
};
const findByIdService = async (id) => {
    try {
        const response = await Auth.findOne({ where: { id } });
        return response;
    } catch (error) {
        throw error;
    }
};
const findByMultipleEmailService = async (emails) => {
  try {
    const users = await Auth.findAll({
      where: { email: emails },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
const userBulkRegisterService = async (payloadArray) => {
  try {
    const response = await Auth.bulkCreate(payloadArray, { returning: true });
    return response;
  } catch (error) {
    throw error;
  }
};
const userRregisteredServices = async (payload) => {
    try {
        const response = await Auth.create({ ...payload });
        return response;
    } catch (error) {
        throw error;
    }
};
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
// Delete one or multiple user accounts by ID(s)
const deleteMultipleUserAccountService = async (ids) => {
    try {
        // ✅ Ensure ids is always an array
        const idArray = Array.isArray(ids) ? ids : [ids];

        // ✅ Delete all users matching the IDs
        const response = await Auth.destroy({
            where: {
                id: idArray
            }
        });

        return {
            deletedCount: response,
            message: `${response} user(s) deleted successfully`
        };
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
const updateUserService = async (id, updatedFields) => {
    try {
        // Update row
     await Auth.update(updatedFields, {
            where: { id }
        });
        // console.log("RESPONSE", respo)
        // Return updated row
        const updatedUser = await Auth.findOne({ where: { id } });
        // console.log("RESPONSE updatedUser", updatedUser)
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


export const changePasswordService = async (id, newPassword) => {
    try {
        // password ko hash karo
        // const hashedPassword = await bcrypt.hash(newPassword, 10);

        // db me update karo
        const response = await Auth.update(
            { password: newPassword },
            { where: { id }, returning: true }
        );

        // response[1] me updated records hote hain (sequelize ka behaviour)
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
    userUsedInDesktopServices,
    updateUserService,
    findByMultipleEmailService,
    userBulkRegisterService,
    deleteMultipleUserAccountService,
    findByIdService
}
