import db from "../modules/index.js";

const { departments: Departments } = db;
export const addDepartmentsServices = async (payload) => {
    try {
        const response = await Departments.create({ ...payload });
        return response;
    } catch (error) {
        console.error("Error during department insertion:", error);
        throw error;
    }
};


export const getAllDepartmentsServices = async () => {
    try {
        const response = Departments.findAll();
        return response
    } catch (error) {
        throw error;
    }
}
export const deleteDepartmentByIdServices = async (id) => {
    try {
        const response = Departments.destroy({ where: { id } });
        return response
    } catch (error) {
        throw error;
    }
}

export const updateDepartmentByIdServices = async (id, data) => {
    try {
        // Sequelize update: returns [affectedRowsCount]
        const [updated] = await Departments.update(data, {
            where: { id },
        });

        if (updated === 0) {
            throw new Error("Department not found or no changes made");
        }

        // Optional: return the updated record
        const updatedDepartment = await Departments.findOne({ where: { id } });

        return updatedDepartment;
    } catch (error) {
        console.error("Error during department update:", error);
        throw error;
    }
};
