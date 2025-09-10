import db from '../modules/index.js';

const{employeeContact:EmployeeContact}=db;

export const addmanuallynewemployeecontact=async(paylaod)=>{
    try {
        const response = await EmployeeContact({...paylaod});
        return response.save();
    } catch (error) {
        throw error;
    }
}

export const getAllEmployeeContactServices=async()=>{
    try {
        const response = await EmployeeContact.find({}).exec();
        return response;
    } catch (error) {
        throw error;
    }
}