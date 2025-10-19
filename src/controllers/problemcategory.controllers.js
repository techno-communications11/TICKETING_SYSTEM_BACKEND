import { createCategoryServices, deleteCategoryofProblemServices, getAllCategoryData, updateCategoryData } from "../Servicess/problmecategory.services.js"

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

export const updateCategoryController = async (req, res) => {
    try {
        const { id, data } = req.body;
        if (!id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category ID is required to update a record.",
            });
        }
        if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Valid update data is required.",
            });
        }
        const updatedCategory = await updateCategoryData(id, data);
        if (!updatedCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found or could not be updated.",
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Category updated successfully.",
        });

    } catch (error) {
        console.error("Error in updateCategoryController:", error.message);
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Validation failed.",
                errors: error.errors.map((e) => e.message),
            });
        }
        if (error.message && error.message.includes("not found")) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error while updating category.",
            error: error.message,
        });
    }
};