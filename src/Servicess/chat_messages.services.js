// import db from '../modules/index.js';

// const { chats_messages: messages } = db;

// const getAllMessagesServices = async (userId, currentUserId) => {
//     try {
//         const response = await messages.find({
//             $or: [
//                 { sender: currentUserId, receiver: userId },
//                 { sender: userId, receiver: currentUserId }
//             ]
//         })
//             .sort({ createdAt: 1 }); // Sort messages by creation date

//         return response;
//     } catch (error) {
//         console.error("Error fetching messages:", error);
//         throw error;
//     }
// };


// export {
//     getAllMessagesServices
// }

import db from '../modules/index.js';
import { Op } from 'sequelize';
const { chats_messages: Messages } = db;

const getAllMessagesServices = async (userId, currentUserId) => {
    try {
        const response = await Messages.findAll({
            where: {
                [Op.or]: [
                    { sender: currentUserId, receiver: userId },
                    { sender: userId, receiver: currentUserId },
                ],
            },
            order: [['createdAt', 'ASC']], // ascending order by createdAt
        });

        return response;
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        throw error;
    }
};

export { getAllMessagesServices };
