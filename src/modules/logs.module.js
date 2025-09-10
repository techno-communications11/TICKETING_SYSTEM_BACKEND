// import mongoose from "mongoose";

// const {Schema}=mongoose;

// const logsSchema=new Schema({
//     date:{type:Date,default:Date.now},
//     time:{type:String,default:Date.now},
//     user:{type:String,required:true},
//     data:{type:[Object],required:true},
//     status:{type:String,required:true},
//     ip:{type:String,required:true},
//     browser:{type:String,required:true},
//     os:{type:String,required:true},
//     device:{type:String,required:true},
//     location:{type:String,required:true},
// },{timestamps:true});

// const logsModule=mongoose.model("logs",logsSchema);
// export default logsModule;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Make sure this points to your MySQL Sequelize instance

const logsModule = sequelize.define("Logs", {
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    time: {
        type: DataTypes.STRING,
        defaultValue: () => new Date().toLocaleTimeString()
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    browser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    os: {
        type: DataTypes.STRING,
        allowNull: false
    },
    device: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default logsModule;
