import { addNewTicketProgressServices, getAllTicketProgressServices } from "../Servicess/ticketprogress.services.js";

export const addTicketProgressController = async (req, res) => {
    try {
        const { data } = req.body;
        const response = await addNewTicketProgressServices(data);
        return res.status(200).json({ status: 200, message: 'success', success: true })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ status: 500, message: 'internal server error', success: false })
    }
}
export const getTicketProgressController = async (req, res) => {
    try {
        const response = await getAllTicketProgressServices();
        return res.status(200).json({ status: 200, message: 'success', success: true, data: response })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ status: 500, message: 'internal server error', success: false })
    }
}