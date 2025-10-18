import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; 

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
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: "logs",
    timestamps: true
});

export default logsModule;
