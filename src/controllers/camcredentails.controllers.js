import { addCamcredentialsServices, getAllCamcredentialsServices } from "../Servicess/camcredentails.services.js"

export const addCamCredentailsController=async(req,res)=>{
    try {
        const {data}=req.body
        const response = await addCamcredentialsServices(data);
        return res.status(200).json({status:200,sucess:true,message:"success",data:response})
    } catch (error) {
        return res.status(500).json({status:500,sucess:false,message:"server error",error:error.message})
    }
}

export const getCamCredentailsController=async(req,res)=>{
    try {
        const response = await getAllCamcredentialsServices();
        return res.status(200).json({status:200,sucess:true,message:"success",data:response})
    } catch (error) {
        return res.status(500).json({status:500,sucess:false,message:"server error",error:error.message})
    }
}