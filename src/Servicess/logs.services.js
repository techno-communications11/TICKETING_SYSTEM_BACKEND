import db from '../modules/index.js';

const {logs:Logs}=db;

export const saveLogsServices=async(paylaod)=>{
    // console.log("payload",paylaod)

    try {
        const response = await Logs.create({...paylaod});
        return response;
    } catch (error) {
        throw error;
    }
}
export const getAllLogsServices=async()=>{
    try {
        const response = await Logs.findAll();
        return response;
    } catch (error) {
        throw error;
    }
}