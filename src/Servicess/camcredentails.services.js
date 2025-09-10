import db from '../modules/index.js';
const {camcastcredentials:Camcredentails}=db;

export const addCamcredentialsServices=async(payload)=>{
    try {
        const resposne = await Camcredentails({...payload});
        return resposne.save();
    } catch (error) {
        throw error;
    }
}

export const getAllCamcredentialsServices=async()=>{
    try {
        const resposne = await Camcredentails.find({}).exec();
        return resposne;
    } catch (error) {
        throw error;
    }
}