import { addmanuallynewemployeecontact, getAllEmployeeContactServices } from "../Servicess/employeecontact.services.js"

export const addmanuallynewemployeecontroller = async (req, res) => {
    try {
        const { data } = req.body;
        const response = await addmanuallynewemployeecontact(data);
        return res.status(200).json({ status: 200, sucess: true, message: "success", data: response })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const getEmployeeController = async (req, res) => {
    try {
        const response = await getAllEmployeeContactServices();
        return res.status(200).json({ status: 200, sucess: true, message: "success", data: response })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}