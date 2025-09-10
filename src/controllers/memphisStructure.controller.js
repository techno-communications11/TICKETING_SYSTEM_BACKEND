import { getAllMemphisServices, newMemphisServices } from "../Servicess/memphisstructure.services.js";

export const newMempgisStructureController=async(req,res)=>{
    try {
        const {data}=req.body;
        const response = await newMemphisServices(data);
        return res.status(200).json({status:200,sucess:true,message:"success",data:response});
    } catch (error) {
        console.log("ERROR",error.message)
        return res.status(500).json({status:500,sucess:false,message:"internal server error",error:error.message});
    }
}

export const getAllMempgisStructureController=async(req,res)=>{
    try {
        const response = await getAllMemphisServices();
        return res.status(200).json({status:200,sucess:true,message:"success",data:response});
    } catch (error) {
        console.log("ERROR",error.message)
        return res.status(500).json({status:500,sucess:false,message:"internal server error",error:error.message});
    }
}
