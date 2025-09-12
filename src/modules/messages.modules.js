// import mongoose from 'mongoose';

// const {Schema} = mongoose;

// const messageSchema=new Schema({
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users ', required: true },
//     receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users ', required: true },
//     content: { type: String, default:"" },
//     image:{type: String, default:""},
//     audio:{type: String, default:""},
//     uid:{type:String, required: true },
//     timestamp: { type: Date, default: Date.now },
// },{timestamps:true});

// const messageModule= mongoose.model('chats_messages',messageSchema);

// export default messageModule

// models/Message.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // your Sequelize instance
import { v4 as uuidv4 } from 'uuid';

const messageModule = sequelize.define("Message", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(), // Sequelize me UUID generate
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: "users", // Table name of your users model
        //     key: "id",
        // },
    },

    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: "users",
        //     key: "id",
        // },
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },

    audio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },

    uid: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "chats_messages",
    timestamps: true, // adds createdAt and updatedAt
});

export default messageModule;
