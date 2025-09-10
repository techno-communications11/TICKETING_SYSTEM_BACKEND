import { systemUpdatedServices, systemUpdationServices } from "../Servicess/systemUpdation.services.js";

export const systemupdationcontroller=async(req,res)=>{
    try {
        const {designation,updateMessage}=req.body;
        const resposne = await systemUpdationServices(designation,updateMessage);
        return res.status(200).json({status:200,success:true,message:"successfully sent all updation msg",data:resposne});
    } catch (error) {
        console.log("ERROR",error.message);
        return res.status(500).json({status:500,success:false,message:"Internal server error",error:error.message});
    }
}

export const systemUpdatecontroller=async(req,res)=>{
    try {
        const {id}=req.body;
        const response = await systemUpdatedServices(id);
        return res.status(200).json({status:200,success:true,message:"successfully sent all updation msg",data:response});
    } catch (error) {
        console.log("ERROR",error.message);
        return res.status(500).json({status:500,success:false,message:"Internal server error",error:error.message});
    }
}