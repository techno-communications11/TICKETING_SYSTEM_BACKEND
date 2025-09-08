// import mongoose from 'mongoose';
// import { use } from 'react';

// const {Schema}=mongoose;

// const commentSchema = new Schema({
//     ticketId:{
//         type:String,
//         required:true
//     },
//     userId:{
//         type:String,
//         required:true
//     },
//     content:{
//         type:String,
//         required:true
//     },
//     userName:{
//         type:String,
//         required:true
//     }
// },{timestamps:true});

// const CommentModule = mongoose.model('Comment', commentSchema);
//  export default CommentModule;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Make sure path is correct

const CommentModule = sequelize.define(
    "Comment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "comments",
        timestamps: true, // same as Mongoose {timestamps:true}
    }
);

export default CommentModule;
