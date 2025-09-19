import db from '../modules/index.js';

const { problmecategory: ProblemCategory } = db;



export const createCategoryServices = async (payload) => {
    try {
        // const response = await ProblemCategory({...payload});
        const response = await ProblemCategory.create({ ...payload });
        return response.save()
    } catch (error) {
        throw error;
    }
}

export const getAllCategoryData = async () => {
    try {
        // const response = await ProblemCategory.find({}).exec();
        const response = await ProblemCategory.findAll();
        return response
    } catch (error) {
        throw error;
    }
}

export const deleteCategoryofProblemServices = async (ids) => {
    try {
        // Check agar array empty ya invalid hai
        if (!ids || ids.length === 0) {
            return "⚠️ Please provide at least one ID!";
        }

        // Delete tickets using array of IDs
        const deletedCount = await ProblemCategory.destroy({
            where: {
                id: ids   // Sequelize automatically handles single ya multiple IDs
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