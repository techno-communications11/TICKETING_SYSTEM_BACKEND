// import db from "../modules/index.js";

// const { Comment: Comment } = db;

// export const createCommentServices = async (commentData) => {
//     try {
//         const response = await Comment({ ...commentData });
//         return response.save();
//     } catch (error) {
//         throw error
//     }
// }

// export const getAllCommentServices = async () => {
//     try {
//         const response = await Comment.find({}).exec();
//         return response;
//     } catch (error) {
//         throw error
//     }
// }

import db from "../modules/index.js";

const { Comment } = db;

// Create a new comment
export const createCommentServices = async (commentData) => {
    try {
        const response = await Comment.create({ ...commentData });
        return response;
    } catch (error) {
        console.error("❌ Error creating comment:", error.message);
        throw error;
    }
}

// Get all comments
export const getAllCommentServices = async () => {
    try {
        const response = await Comment.findAll(); // Sequelize equivalent of find({})
        return response;
    } catch (error) {
        console.error("❌ Error fetching comments:", error.message);
        throw error;
    }
}
