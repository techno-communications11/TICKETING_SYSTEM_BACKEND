import { deleteLogsServices, getAllLogsServices } from "../Servicess/logs.services.js";

export const getAllLogsControllers = async (req, res) => {
    try {
        const response = await getAllLogsServices();
        return res.status(200).json({ status: 200, sucess: true, message: "successfully", data:response });
    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message });
    }
}
export const deleteLogsControllers = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await deleteLogsServices(id);
        console.log("response", response)
        return res.status(200).json({ status: 200, sucess: true, message: "successfully" });
    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message });
    }
}