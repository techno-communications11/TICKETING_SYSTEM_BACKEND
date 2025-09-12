import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const TicketProgressModule = sequelize.define(
    "TicketProgress",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: "Tickets", // Make sure this matches your Tickets table name
            //     key: "id",
            // },
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
