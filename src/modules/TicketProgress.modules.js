import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';
export const TicketProgressModule = sequelize.define(
    "TicketProgress",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        ticketId: {
            type: DataTypes.STRING,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT, // optional: for any notes about progress
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER, // you can store the userId of the agent updating
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "ticket_progress", // table name in DB
        timestamps: false, // we are manually handling updatedAt
    }
);
