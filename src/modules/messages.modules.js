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

const messageModule = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // Table name of your users model
            key: "id",
        },
    },

    receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
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
