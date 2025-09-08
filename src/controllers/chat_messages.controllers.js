import { getAllMessagesServices } from "../Servicess/chat_messages.services.js"

const getAllMessages = async (req, res) => {
    const { userId, currentID } = req.params;

    try {
        const response = await getAllMessagesServices(userId, currentID);

        return res.status(200).json({ status: 200, success: true, message: "sucess", data: response });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
}
export {
    getAllMessages
}