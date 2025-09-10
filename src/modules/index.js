import mongoose from "mongoose";
import authModule from "./users.modules.js";
import messageModule from "./messages.modules.js";
import problemcategoryModule from "./problemcategory.modules.js";
import storeModule from "./store.modules.js";
import ticketModule from "./tickets.module.js";
import departmentModule from "./department.modules.js";
import notificationsModule from "./notifications.module.js";
import logsModule from "./logs.module.js";
import mmdminfomodule from "./mmdm.module.js";
import camcredentialsModule from "./camcastcredentials.module.js";
import employeecontactModule from "./employeecontact.module.js";
import memphisModule from "./memphis.modules.js";
import CommentModule from "./comments.module.js";
import sequelize from "../config/db.js";
import { TicketProgressModule } from "./TicketProgress.modules.js";
// import TicketProgressModule from "./TicketProgress.modules.js";

const db = {};
sequelize.sync({ alter: true }) // alter: true → agar table already hai to columns update karega
    .then(() => console.log("All tables synced!"))
    .catch((err) => console.error("Error syncing tables:", err));

db.mongoose = mongoose;
db.auth = authModule;
db.chats_messages = messageModule;
db.problmecategory = problemcategoryModule;
db.stores = storeModule;
db.tickets = ticketModule;
db.departments = departmentModule;
db.notifications = notificationsModule;
db.logs = logsModule;
db.mmdminfo = mmdminfomodule;
db.camcastcredentials = camcredentialsModule;
db.employeeContact = employeecontactModule;
db.memphisstructure = memphisModule;
db.Comment = CommentModule;
db.TicketProgress = TicketProgressModule

export default db;
