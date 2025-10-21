
// import db from '../modules/index.js';

// const { notifications: Notification } = db;


// export const addNotifications = async (payload) => {
//     try {
//         const response = await Notification({ ...payload });
//         return response.save()
//     } catch (error) {
//         throw error;
//     }
// }

// export const getAllNotifications = async () => {
//     try {
//         const resposen = await Notification.find({}).exec();
//         return resposen
//     } catch (error) {
//         throw error;
//     }
// }
// export const updateNotificationsServices = async (_id, agent_notification, manager_notification) => {
//     try {
//         if (!_id) throw new Error("Notification ID is required!");

//         const updateFields = {};
//         if (agent_notification !== undefined) updateFields.agent_notification = agent_notification;
//         if (manager_notification !== undefined) updateFields.manager_notification = manager_notification;

//         if (Object.keys(updateFields).length === 0) {
//             throw new Error("No valid fields provided for update!");
//         }

//         const response = await Notification.findByIdAndUpdate(
//             _id,
//             updateFields,
//             { new: true }
//         );

//         if (!response) throw new Error("Notification not found!");

//         return response;
//     } catch (error) {
//         console.error("Error updating notification:", error.message);
//         throw error;
//     }
// };


import db from '../modules/index.js';

const { notifications:Notification } = db;

// Add new notification
export const addNotifications = async (payload) => {
    try {
        const response = await Notification.create({ ...payload });
        return response;
    } catch (error) {
        throw error;
    }
};

// Get all notifications
export const getAllNotifications = async () => {
    try {
        const response = await Notification.findAll(); // Sequelize me findAll hota hai
        return response;
    } catch (error) {
        throw error;
    }
};
// Get all notifications
export const deleteNotifications = async (id) => {
    try {
        const response = await Notification.destroy({ where: { id } }); // Sequelize me findAll hota hai
        return response;
    } catch (error) {
        throw error;
    }
};

// Update notification by ID
export const updateNotificationsServices = async (id, agent_notification, manager_notification) => {
    try {
        if (!id) throw new Error("Notification ID is required!");

        const updateFields = {};
        if (agent_notification !== undefined) updateFields.agent_notification = agent_notification;
        if (manager_notification !== undefined) updateFields.manager_notification = manager_notification;

        if (Object.keys(updateFields).length === 0) {
            throw new Error("No valid fields provided for update!");
        }

        const [updated] = await Notification.update(updateFields, {
            where: { id }, // Sequelize primary key default: "id"
            returning: true,
        });

        if (updated === 0) throw new Error("Notification not found!");

        // return updated record
        const updatedNotification = await Notification.findByPk(id);
        return updatedNotification;
    } catch (error) {
        console.error("Error updating notification:", error.message);
        throw error;
    }
};
