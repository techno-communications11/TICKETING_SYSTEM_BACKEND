import mongoose from "mongoose";

const {Schema}=mongoose;

const employeecontactSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    ntid:{
        type:String,
        require:true
    },
    mobile_phone:{
        type:String,
        require:true
    },
    t_mobile_email_id:{
        type:String,
        require:true
    }
},{timestamps:true});

const employeecontactModule=mongoose.model('employeeContact',employeecontactSchema);

export default employeecontactModule