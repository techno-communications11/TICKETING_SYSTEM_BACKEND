import db from '../modules/index.js';

const { problmecategory: ProblemCategory } = db;

export const createCategoryServices = async (payload) => {
    try {
        const response = await ProblemCategory.create({ ...payload });
        return response.save()
    } catch (error) {
        throw error;
    }
}

export const getAllCategoryData = async () => {
    try {
        const response = await ProblemCategory.findAll();
        return response
    } catch (error) {
        throw error;
    }
}
export const updateCategoryData = async (id, data) => {
    try {
        if (!id || !data || typeof data !== "object") {
            throw new Error("Invalid input: id and data are required for update.");
        }
        const existingCategory = await ProblemCategory.findByPk(id);
        if (!existingCategory) {
            throw new Error("Category not found with the given ID.");
        }
        const updated = await ProblemCategory.update(
            { ...data },
            { where: { id } }
        );
        if (updated[0] === 0) {
            throw new Error("No changes detected or update failed.");
        }
        const updatedCategory = await ProblemCategory.findByPk(id);
        return updatedCategory;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryofProblemServices = async (ids) => {
    try {
        if (!ids || ids.length === 0) {
            return "⚠️ Please provide at least one ID!";
        }
        const deletedCount = await ProblemCategory.destroy({
            where: {
                id: ids
            }
        });
        if (deletedCount === 0) {
            return "❌ No tickets found for the given IDs!";
        }
        return `✅ Successfully deleted ${deletedCount} ticket(s).`;
    } catch (error) {
        throw error;
    }
}