import { addDepartmentsServices, deleteDepartmentByIdServices, getAllDepartmentsServices, updateDepartmentByIdServices } from "../Servicess/departments.services.js"

export const addDepartmentsControllers = async (req, res) => {
    try {
        const { data } = req.body;
        await addDepartmentsServices(data);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    } catch (error) {
        console.log("Error", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const getAllDepartmentsController = async (req, res) => {
    try {
        const response = await getAllDepartmentsServices();
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response })
    } catch (error) {
        console.log("Error", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const deleteDepartmentsController = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteDepartmentByIdServices(id);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    } catch (error) {
        console.log("Error", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}
export const updateDepartmentsControllers = async (req, res) => {
    try {
        const { id, data } = req.body;
        if (!id || !data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request — 'id' and 'data' are required.",
            });
        }
        const updatedDepartment = await updateDepartmentByIdServices(id, data);
        if (updatedDepartment) {
            return res.status(200).json({
                success: true,
                message: "Department updated successfully.",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Department not found.",
            });
        }
    } catch (error) {
        console.error("Error while updating department:", error.message);
        if (error.message === "Department not found or no changes made") {
            return res.status(404).json({
                success: false,
                message: "Department not found or no changes made.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error while updating department.",
            error: error.message,
        });
    }
};
