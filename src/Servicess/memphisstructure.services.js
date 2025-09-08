import db from '../modules/index.js';

const {memphisstructure:MemphisStructure}=db;

export const newMemphisServices=async(payload)=>{
    try {
        const response = await MemphisStructure({...payload});
        return response.save();
    } catch (error) {
        throw error;
    }
}

export const getAllMemphisServices=async()=>{
    try {
        const response = await MemphisStructure.find({}).exec();
        return response;
    } catch (error) {
        throw error;
    }
}