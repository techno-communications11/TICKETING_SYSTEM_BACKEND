import mongoose from "mongoose";

const {Schema}=mongoose;

const camcredentilasSchema=new Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    website_url:{
        type:String,
        require:true
    },
},{timestamps:true});

const camcredentialsModule=mongoose.model("camcastcredentials",camcredentilasSchema);

export default camcredentialsModule;