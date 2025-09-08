import { addDepartmentsServices } from "../Servicess/departments.services.js"

export const addDepartmentsControllers = async (req, res) => {
    try {
        const { name } = req.body;
        const response = await addDepartmentsServices(name);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error",error:error.message })
    }
}

export const getAllDepartments=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({status:500,sucess:false,message:"internal server error",error:error.message})
    }
}