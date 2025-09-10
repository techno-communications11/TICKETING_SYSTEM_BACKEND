import db from '../modules/index.js';

const{problmecategory:ProblemCategory}=db;



export const createCategoryServices=async(payload)=>{
    try {
        // const response = await ProblemCategory({...payload});
        const response = await ProblemCategory.create({...payload});
        return response.save()
    } catch (error) {
        throw error;
    }
}

export const getAllCategoryData=async()=>{
    try {
        // const response = await ProblemCategory.find({}).exec();
        const response = await ProblemCategory.findAll();
        return response
    } catch (error) {
        throw error;
    }
}