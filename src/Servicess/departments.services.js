import db from "../modules/index.js";

const {departments:Departments}=db;
export const addDepartmentsServices = async (name) => {
    try {
        // console.log(payload)
        const response = await Departments(name);
        console.log(response)
        return response.save(); 
    } catch (error) {
        console.error("Error during department insertion:", error);
        throw error;  
    }
};


export const getAllDepartmentsServices=async()=>{
    try {
        const response = Departments.find({}).exec();

        return response
    } catch (error) {
        throw error;
    }
}
