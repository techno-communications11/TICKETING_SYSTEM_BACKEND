// import mongoose from 'mongoose'
// const ticketSchema = new mongoose.Schema({
//   ticketId: { type: String, required: true, unique: true, alias: "_id" },
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   store: { type: String, required: true },
//   category: { type: String, required: true },
//   market: { type: String, required: true },
//   managerName: { type: String, default: null },
//   managerID: { type: String, default: null },
//   ticketDescription: { type: String, required: true },
//   userId: { type: String, required: true },
//   files: { type: [String], default: [] },
//   assignerId: { type: String, default: null },
//   assignerName: { type: String, default: null },
//   status: { type: String, default: "pending" },
//   requestreopen: { type: Boolean, default: false },
//   reopenreason: { type: String, default: null },
//   reopendate: {
//     type: Date,
//     default: Date.now
//   },
//   isSettled: { type: Boolean, default: null },
//   completedAt: { type: Date, default: null },
//   priority: { type: String, default: null },
//   dueDate: { type: Date, default: null },
//   agentstatus: { type: String, default: null },
//   assign_data: { type: String, default: null },
//   assign_email: { type: String, default: null },
//   assign_At: { type: String, default: null },
//   department: { type: String, default: null },
//   new_manager_tickets: { type: Boolean, require: false },
//   new_agent_tickets: { type: Boolean, require: false },
//   closedAt: { type: Date, default: null },
//   market_manager_notification: { type: Boolean, default: false },
//   dm_manager_notification: { type: Boolean, default: false },
//   approved: { type: Boolean, default: false },
//   approve_by: { type: String, default: null },
//   denial_by: { type: String, default: null },
//   dm_name: { type: String, require: true },
//   dm_email: { type: String, require: true },
//   dm_phone: { type: String, require: true },
//   store_email: { type: String, require: true },
//   store_phone: { type: String, require: true },
//   department_email: { type: String, require: true },
//   managerName_email: { type: String, default: null },
//   market_manager_name: { type: String, require: true },
//   market_manager_email: { type: String, require: true },
//   market_manager_phone: { type: String, require: true },
//   notes_by_market_manager: { type: String, default: null },
//   notes_by_distraic_manager: { type: String, default: null },
//   creatordepartment: { type: String, default: null },
//   senior_managers: { type: String, default: null },
//   progress: [
//     {
//       status: {
//         type: String,
//         default: 'create'
//       },
//       time: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],
//   reason: { type: String, default: null },
//   store_id: { type: String, default: null },
//   store_Tech_id: { type: String, default: null },
//   store_detail: {
//     type: [Object],
//     default: [null]
//   },
//   districtManager_id: { type: String, default: null },
//   marketManager_id: { type: String, default: null },
//   assignedmanagername: { type: String, default: null },
// }, { timestamps: true });

// const ticketModule = mongoose.model('ticket', ticketSchema);

// export default ticketModule;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Make sure this points to your MySQL Sequelize instance
import { v4 as uuidv4 } from "uuid";


const Ticket = sequelize.define("Ticket", {
  // ticketId: { type: DataTypes.STRING, allowNull: false, unique: true },
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(), // har naya record pe UUID banega
  },

  ticketId: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  store: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  market: { type: DataTypes.STRING, allowNull: false },
  managerName: { type: DataTypes.STRING, allowNull: true },
  managerID: { type: DataTypes.STRING, allowNull: true },
  ticketDescription: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.STRING, allowNull: false },
  files: { type: DataTypes.JSON, defaultValue: [] },
  assignerId: { type: DataTypes.STRING, allowNull: true },
  assignerName: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  requestreopen: { type: DataTypes.BOOLEAN, defaultValue: false },
  reopenreason: { type: DataTypes.STRING, allowNull: true },
  reopendate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isSettled: { type: DataTypes.BOOLEAN, allowNull: true },
  completedAt: { type: DataTypes.DATE, allowNull: true },
  priority: { type: DataTypes.STRING, allowNull: true },
  dueDate: { type: DataTypes.DATE, allowNull: true },
  agentstatus: { type: DataTypes.STRING, allowNull: true },
  assign_data: { type: DataTypes.STRING, allowNull: true },
  assign_email: { type: DataTypes.STRING, allowNull: true },
  assign_At: { type: DataTypes.STRING, allowNull: true },
  department: { type: DataTypes.STRING, allowNull: true },
  new_manager_tickets: { type: DataTypes.BOOLEAN, allowNull: true },
  new_agent_tickets: { type: DataTypes.BOOLEAN, allowNull: true },
  closedAt: { type: DataTypes.DATE, allowNull: true },
  market_manager_notification: { type: DataTypes.BOOLEAN, defaultValue: false },
  dm_manager_notification: { type: DataTypes.BOOLEAN, defaultValue: false },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  approve_by: { type: DataTypes.STRING, allowNull: true },
  denial_by: { type: DataTypes.STRING, allowNull: true },
  dm_name: { type: DataTypes.STRING, allowNull: false },
  dm_email: { type: DataTypes.STRING, allowNull: false },
  dm_phone: { type: DataTypes.STRING, allowNull: false },
  store_email: { type: DataTypes.STRING, allowNull: false },
  store_phone: { type: DataTypes.STRING, allowNull: false },
  department_email: { type: DataTypes.STRING, allowNull: false },
  managerName_email: { type: DataTypes.STRING, allowNull: true },
  market_manager_name: { type: DataTypes.STRING, allowNull: false },
  market_manager_email: { type: DataTypes.STRING, allowNull: false },
  market_manager_phone: { type: DataTypes.STRING, allowNull: false },
  notes_by_market_manager: { type: DataTypes.TEXT, allowNull: true },
  notes_by_distraic_manager: { type: DataTypes.TEXT, allowNull: true },
  creatordepartment: { type: DataTypes.STRING, allowNull: true },
  senior_managers: { type: DataTypes.STRING, allowNull: true },
  reason: { type: DataTypes.STRING, allowNull: true },
  store_id: { type: DataTypes.STRING, allowNull: true },
  store_Tech_id: { type: DataTypes.STRING, allowNull: true },
  store_detail: { type: DataTypes.JSON, defaultValue: [null] },
  districtManager_id: { type: DataTypes.STRING, allowNull: true },
  marketManager_id: { type: DataTypes.STRING, allowNull: true },
  assignedmanagername: { type: DataTypes.STRING, allowNull: true },
  // istranfereticket: { type: DataTypes.BOOLEAN, default: false },
  istransfereticket: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // "default" nahi, "defaultValue" use karo
    allowNull: false       // optional, agar aap chahte ho ki ye kabhi NULL na ho
  },
  currentOwnerId: { type: DataTypes.STRING, allowNull: true },
  previousOwnerId: { type: DataTypes.STRING, allowNull: true },
  departmentName: { type: DataTypes.STRING, allowNull: true },
  transferReason: { type: DataTypes.STRING, allowNull: true },
  transferDate: { type: DataTypes.STRING, allowNull: true },
  progress: {
    type: DataTypes.JSON,
    defaultValue: [{ status: "create", time: new Date() }]
  }
}, { tableName: "tickets", timestamps: true });

export default Ticket;
