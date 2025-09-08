import { createCommentServices, getAllCommentServices } from "../Servicess/Comment.services.js";

export const createCommentController = async (req, res) => {
    try {
        const { data } = req.body;
        const response = await createCommentServices(data);
        return res.status(200).json({
            status: 200,
            sucess: true,
            message: "Comment created successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            sucess: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
// getAllCommentServices

export const getAllCommentController = async (req, res) => {
    try {
        const response = await getAllCommentServices();
        return res.status(200).json({
            status: 200,
            sucess: true,
            message: "Comment created successfully",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            sucess: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}