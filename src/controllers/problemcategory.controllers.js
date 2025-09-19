import { createCategoryServices, deleteCategoryofProblemServices, getAllCategoryData } from "../Servicess/problmecategory.services.js"

export const problemcategorycontrollers = async (req, res) => {
    try {
        const { name, department, department_email } = req.body;
        const obj = { name, department, department_email };
        const response = await createCategoryServices(obj);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    } catch (error) {
        console.log("error", error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const getAllProblemsCategoryData = async (req, res) => {
    try {
        const response = await getAllCategoryData();
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const deleteProblemCategoryController = async (req, res) => {
    try {
        const { id } = req.body; // 👈 URL params se ID lena better hai

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

       await deleteCategoryofProblemServices(id)

        return res.status(200).json({
            success: true,
            message: "Problem category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting problem category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};