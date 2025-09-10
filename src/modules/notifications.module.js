// import mongoose from "mongoose";

// const { Schema } = mongoose;


// const notificationsSchema = new Schema({
//     ticketId: {
//         type: String,
//         require: true
//     },
//     ticket_Id: {
//         type: String,
//         require: true
//     },
//     recipientId: {
//         type: String,
//         default: null
//     },
//     senderId: {
//         type: String,
//         require: true
//     },
//     manager: {
//         type: String,
//         default: null
//     },
//     marketmanager: {
//         type: String,
//         default: null
//     },
//     distrcitmanager: {
//         type: String,
//         default: null
//     }
//     ,
//     notification_type: {
//         type: String,
//         require: true
//     },
//     agent_notification: {
//         type: Boolean,
//         default: false
//     },
//     manager_notification: {
//         type: Boolean,
//         default: false
//     },
//     market_manager_notification: {
//         type: Boolean,
//         default: false
//     },
//     district_manager_notification: {
//         type: Boolean,
//         default: false
//     },
//     store: {
//         type: String,
//         default: null
//     }
// }, { timestamps: true });

// const notificationsModule = mongoose.model('notifications', notificationsSchema);

// export default notificationsModule

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // apna db connection import karo

const Notification = sequelize.define("Notification", {
    ticketId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ticket_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipientId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    marketmanager: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    distrcitmanager: { // ⚠️ typo: "districtmanager" correct kar lo agar db me spelling galat na ho
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    notification_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    agent_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    manager_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    market_manager_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    district_manager_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    store: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: "notifications",
    timestamps: true, // createdAt, updatedAt
});

export default Notification;
