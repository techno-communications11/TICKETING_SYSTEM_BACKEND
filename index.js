import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import useragent from 'express-useragent';
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from './src/constant/constant.js';
import serverConfig from './src/config/server.config.js';
import db from './src/modules/index.js'
import router from './src/routing/index.js';
import sequelize from './src/config/db.js';
const { chats_messages: Message } = db

let connnectionRetries = 0;
const connectionDB = async () => {
    try {
        console.log("Establishing DB connection....");
        await sequelize.authenticate();
        // await mongoose.connect(serverConfig.dbURL);
        console.log('Db connected');
    } catch (error) {
        if (connnectionRetries < DB_RETRY_LIMIT) {
            connnectionRetries++;
            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`);
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT));
            await connectionDB();
        } else {
            process.exit();
        }
    }
}

const app = express();
app.use(useragent.express());
app.use(cors({
    origin: "*",
    // origin: ["http://localhost:5173","http://localhost:3000","https://ticketing-system-updated.vercel.app", "https://ticketing-module2.vercel.app", 'http://localhost:3200', 'http://localhost:3201', 'http://localhost:3202', 'https://ticketing-systems-five.vercel.app', 'https://ticketing-systems2.vercel.app', 'https://ticketing-system-sever.onrender.com'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

const PORT = process.env.PORT || 8001;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: "*",
        origin: ["http://localhost:5173", "http://localhost:3000", "https://ticketing-system-updated.vercel.app", "https://ticketing-module2.vercel.app", 'http://localhost:3200', 'http://localhost:3201', 'http://localhost:3202', 'https://ticketing-systems-five.vercel.app', 'https://ticketing-systems2.vercel.app', 'https://ticketingapi.techno-communications.com/', 'https://ticketing.techno-communications.com'],
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }
});

const userSockets = {};

io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    socket.on('registerUser', (userId) => {
        userSockets[userId] = socket.id;
        console.log(`🔗 User registered: ${userId} -> ${socket.id}`);
        socket.broadcast.emit('user online', { userId, online: true });
        io.emit("updateOnlineUsers", Object.keys(userSockets));
    });
    socket.on("getOnlineUsers", () => {
        io.emit("updateOnlineUsers", Object.keys(userSockets)); // onlineUsersList ka data store karna hoga
    });


    socket.on('chat message', async ({ sender, receiver, content, image, audio }) => {
        console.log('💬 Message from', sender, 'to', receiver,);
        await Message.create({ sender, receiver, content: content || "", image: image || null, audio: audio || null, uid: sender + receiver });
        // const message = await Message.create({ sender, receiver, content: content || "", image: image || null, audio: audio || null, uid: sender + receiver });
        // await message.save();

        const receiverSocketId = userSockets[receiver]; // FIXED: Using correct map
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('chat message', { sender, receiver, content, image, audio });
            io.to(receiverSocketId).emit('notification', { type: 'new_message', sender, receiver, content: content || "You have received an audio message.", audio });
        } else {
            console.log(`⚠️ User ${receiver} is offline. Notification skipped.`);
        }
        socket.emit('message-sent', { success: true, message: 'Message delivered!' });
    });
    socket.on('create store ticket', async ({ ticketId, storeID, marketManager, dmManager, details }) => {
        console.log(`🎟️ Ticket Created: ${ticketId} by ${storeID}, Assigned to: ${marketManager}`);
        const marketmanagerSocketId = userSockets[marketManager]; // FIXED: Using correct map
        if (marketmanagerSocketId) {
            io.to(marketmanagerSocketId).emit('ticket assigned market manager', { ticketId, storeID, marketManager, details });
            console.log(`📢 Ticket ${ticketId} sent to market manager ${marketManager}`);
        } else {
            console.log(`⚠️ market Manager ${marketManager} is offline. Ticket notification skipped.`);
        }
        const districtmanagerSocketId = userSockets[dmManager]; // FIXED: Using correct map
        if (districtmanagerSocketId) {
            io.to(districtmanagerSocketId).emit('ticket assigned district manager', { ticketId, storeID, dmManager, details });
            console.log(`📢 Ticket ${ticketId} sent to district manager ${dmManager}`);
        } else {
            console.log(`⚠️ district Manager ${dmManager} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('approved ticket by district manager', async ({ ticketId, storeID, marketManager, dmManager, managerId, details }) => {
        console.log(`🎟️Approved Ticket: ${ticketId} by ${dmManager}, notify to: ${marketManager} & ${storeID} $ ${managerId}`);
        const marketmanagerSocketId = userSockets[marketManager];
        if (marketmanagerSocketId) {
            io.to(marketmanagerSocketId).emit('approved ticket notify to market manager', { ticketId, marketManager, details });
            console.log(`📢 Ticket ${ticketId} sent to market manager ${marketManager}`);
        } else {
            console.log(`⚠️ market Manager ${marketManager} is offline. Ticket notification skipped.`);
        }
        const storemanagerSocketId = userSockets[storeID];
        if (storemanagerSocketId) {
            io.to(storemanagerSocketId).emit('approved ticket notify to store', { ticketId, storeID, details });
            console.log(`📢 Ticket ${ticketId} sent to store manager ${storeID}`);
        } else {
            console.log(`⚠️ district Manager ${storeID} is offline. Ticket notification skipped.`);
        }
        const departmentmanagerSocketId = userSockets[managerId];
        if (departmentmanagerSocketId) {
            io.to(departmentmanagerSocketId).emit('approved ticket notify to department manager from district', { ticketId, managerId, details });
            console.log(`📢 Ticket ${ticketId} sent to department manager ${managerId}`);
        } else {
            console.log(`⚠️ district department Manager ${managerId} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('approved ticket by market manager', async ({ ticketId, storeID, marketManager, dmManager, managerId, details }) => {
        console.log(`🎟️Approved Ticket: ${ticketId} by ${marketManager}, notify to: ${dmManager} & ${storeID}`);
        const districtmanagerSocketId = userSockets[dmManager];
        if (districtmanagerSocketId) {
            io.to(districtmanagerSocketId).emit('approved ticket notify to district manager', { ticketId, dmManager, details });
            console.log(`📢 Ticket ${ticketId} sent to district manager ${dmManager}`);
        } else {
            console.log(`⚠️ market Manager ${marketManager} is offline. Ticket notification skipped.`);
        }
        const storemanagerSocketId = userSockets[storeID];
        if (storemanagerSocketId) {
            io.to(storemanagerSocketId).emit('approved ticket notify to store from m', { ticketId, storeID, details });
            console.log(`📢 Ticket ${ticketId} sent to store manager ${storeID}`);
        } else {
            console.log(`⚠️ district Manager ${storeID} is offline. Ticket notification skipped.`);
        }
        const departmentmanagerSocketId = userSockets[managerId];
        if (departmentmanagerSocketId) {
            io.to(departmentmanagerSocketId).emit('approved ticket notify to department manager from market manager', { ticketId, managerId, details });
            console.log(`📢 Ticket ${ticketId} sent to department manager ${managerId}`);
        } else {
            console.log(`⚠️ district department Manager ${managerId} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('denied ticket by district manager', async ({ ticketId, storeID, marketManager, dmManager, details, reason }) => {
        console.log(`denied Ticket: ${ticketId} by ${dmManager}, notify to: ${marketManager} & ${storeID}`);
        const marketmanagerSocketId = userSockets[marketManager];
        if (marketmanagerSocketId) {
            io.to(marketmanagerSocketId).emit('denied ticket notify to market manager', { ticketId, marketManager, details, reason });
            console.log(`📢 Ticket ${ticketId} sent to market manager ${marketManager}`);
        } else {
            console.log(`⚠️ market Manager ${marketManager} is offline. Ticket notification skipped.`);
        }
        const storemanagerSocketId = userSockets[storeID];
        if (storemanagerSocketId) {
            io.to(storemanagerSocketId).emit('denied ticket notify to store', { ticketId, storeID, details, reason });
            console.log(`📢 Ticket ${ticketId} sent to store manager ${storeID}`);
        } else {
            console.log(`⚠️ district Manager ${storeID} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('denied ticket by Market manager', async ({ ticketId, storeID, marketManager, dmManager, details, reason }) => {
        console.log(`denied Ticket: ${ticketId} by ${marketManager}, notify to: ${dmManager} & ${storeID}`);
        const districtmanagerSocketId = userSockets[dmManager];
        if (districtmanagerSocketId) {
            io.to(districtmanagerSocketId).emit('denied ticket notify to district manager', { ticketId, dmManager, details });
            console.log(`📢 Ticket ${ticketId} sent to district manager ${dmManager}`);
        } else {
            console.log(`⚠️ market Manager ${marketManager} is offline. Ticket notification skipped.`);
        }
        const storemanagerSocketId = userSockets[storeID];
        if (storemanagerSocketId) {
            io.to(storemanagerSocketId).emit('denied ticket notify to store from m', { ticketId, storeID, details, reason });
            console.log(`📢 Ticket ${ticketId} sent to store manager ${storeID}`);
        } else {
            console.log(`⚠️ district Manager ${storeID} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('create ticket', async ({ ticketId, createdBy, managerId, details }) => {
        console.log(`🎟️ Ticket Created: ${ticketId} by ${createdBy}, Assigned to: ${managerId}`);
        const managerSocketId = userSockets[managerId]; // FIXED: Using correct map
        if (managerSocketId) {
            io.to(managerSocketId).emit('ticket assigned', { ticketId, createdBy, managerId, details });
            console.log(`📢 Ticket ${ticketId} sent to manager ${managerId}`);
        } else {
            console.log(`⚠️ Manager ${managerId} is offline. Ticket notification skipped.`);
        }
    });

    socket.on('assign ticket', async ({ ticketId, managerId, agentId, details }) => {
        console.log(`📩 Ticket ${ticketId} assigned to Agent ${agentId} by Manager ${managerId}`);
        const agentSocketId = userSockets[agentId];
        if (agentSocketId) {
            io.to(agentSocketId).emit('ticket assigned agent', { ticketId, agentId, details });
            console.log(`🚀 Real-time ticket sent to agent ${agentId}`);
        } else {
            console.log(`⚠️ Agent ${agentId} is offline. Notification skipped.`);
        }
    });

    socket.on('review ticket by department manager', async ({ ticketId, status, adminId, detail, marketManager, dmManager }) => {
        console.log("detailData", { status })
        io.emit('review ticket by department manager', { ticketId, status });

        const adminSocketId = userSockets[adminId];
        if (adminSocketId) {
            io.to(adminSocketId).emit('ticket opened', { ticketId, status, adminId });
            console.log(`📢 Notification sent to admin ${adminId} ${detail}`);
        } else {
            console.log(`⚠️ Admin ${adminId} is offline. Notification skipped.`);
        }
        const managerSocketId = userSockets[marketManager];
        if (managerSocketId) {
            io.to(managerSocketId).emit('review ticket by market manager', { ticketId, status, marketManager });
            console.log(`📢 Notification sent to market manager ${marketManager} ${detail}`);
        } else {
            console.log(`⚠️ market manager ${adminId} is offline. Notification skipped.`);
        }
        const districtmanagerSocketId = userSockets[dmManager];
        if (districtmanagerSocketId) {
            io.to(districtmanagerSocketId).emit('review ticket by distrcit manager', { ticketId, status, dmManager });
            console.log(`📢 Notification sent to district manager ${dmManager} ${detail}`);
        } else {
            console.log(`⚠️ district manager ${dmManager} is offline. Notification skipped.`);
        }
    });
    socket.on('update agent status', async ({ ticketId, status, adminId, managerId, detail }) => {
        console.log(`📢 Agent opened ticket ${ticketId}, notifying admin ${adminId} and manager ${managerId}`);
        const adminSocketId = userSockets[adminId];
        if (adminSocketId) {
            io.to(adminSocketId).emit('ticket opened by agent', { ticketId, status, openedBy: 'Agent', detail, adminId });
            console.log(`✅ Notification sent to Admin (${adminId})`);
        } else {
            console.log(`⚠️ Admin (${adminId}) is offline. Notification skipped.`);
        }
        const managerSocketId = userSockets[managerId];
        if (managerSocketId) {
            io.to(managerSocketId).emit('ticket opened by agent', { ticketId, status, openedBy: 'Agent', detail, managerId });
            console.log(`✅ Notification sent to Manager (${managerId})`);
        } else {
            console.log(`⚠️ Manager (${managerId}) is offline. Notification skipped.`);
        }
    });

    socket.on('complete ticket from agent', async ({ ticketId, status, adminId, managerId, detail, marketManager, dmManager, storeID }) => {
        console.log(`📢 Agent complete ticket ${ticketId}, notifying admin ${adminId}, manager ${managerId}, market manager ${marketManager} , distrcit manager ${dmManager} and store ${storeID}`);
        const adminSocketId = userSockets[adminId];
        if (adminSocketId) {
            io.to(adminSocketId).emit('ticket complete by agent', { ticketId, status, completeBy: 'Agent', detail, adminId });
            console.log(`✅ Notification sent to Admin (${adminId})`);
        } else {
            console.log(`⚠️ Admin (${adminId}) is offline. Notification skipped.`);
        }
        const managerSocketId = userSockets[managerId];
        if (managerSocketId) {
            io.to(managerSocketId).emit('ticket complete by agent', { ticketId, status, completeBy: 'Agent', detail, managerId });
            console.log(`✅ Notification sent to Manager (${managerId})`);
        } else {
            console.log(`⚠️ Manager (${managerId}) is offline. Notification skipped.`);
        }
        const marketmanagerSocketId = userSockets[marketManager];
        if (marketmanagerSocketId) {
            io.to(marketmanagerSocketId).emit('ticket complete by agent notify to market manager', { ticketId, status, completeBy: 'Agent', detail, marketManager });
            console.log(`✅ Notification sent to Market Manager (${marketManager})`);
        } else {
            console.log(`⚠️ Market Manager (${marketManager}) is offline. Notification skipped.`);
        }
        const distrcitmanagerSocketId = userSockets[dmManager];
        if (distrcitmanagerSocketId) {
            io.to(distrcitmanagerSocketId).emit('ticket complete by agent notify to district manager', { ticketId, status, completeBy: 'Agent', detail, dmManager });
            console.log(`✅ Notification sent to District Manager (${dmManager})`);
        } else {
            console.log(`⚠️District Manager (${dmManager}) is offline. Notification skipped.`);
        }
        const storeSocketId = userSockets[storeID];
        if (storeSocketId) {
            io.to(storeSocketId).emit('ticket complete by agent notify to store', { ticketId, status, completeBy: 'Agent', detail, storeID });
            console.log(`✅ Notification sent to store (${storeID})`);
        } else {
            console.log(`⚠️ store (${storeID}) is offline. Notification skipped.`);
        }
    });

    socket.on('closed ticket', async ({ ticketId, status, adminId, managerId, detail, agentId, marketManager, dmManager, storeID }) => {
        console.log(`📢 close ticket ${ticketId}, notifying admin ${adminId} and manager ${managerId}`);

        const adminSocketId = userSockets[adminId];
        if (adminSocketId) {
            io.to(adminSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, adminId });
            console.log(`✅ Notification sent to Admin (${adminId})`);
        } else {
            console.log(`⚠️ Admin (${adminId}) is offline. Notification skipped.`);
        }
        const managerSocketId = userSockets[managerId];
        if (managerSocketId) {
            io.to(managerSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, managerId });
            console.log(`✅ Notification sent to Manager (${managerId})`);
        } else {
            console.log(`⚠️ Manager (${managerId}) is offline. Notification skipped.`);
        }
        const agentSocketId = userSockets[agentId];
        if (agentSocketId) {
            io.to(agentSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, agentId });
            console.log(`✅ Notification sent to Agent (${agentId})`);
        } else {
            console.log(`⚠️ Agent (${agentId}) is offline. Notification skipped.`);
        }
        const marketmanagerSocketId = userSockets[marketManager];
        if (marketmanagerSocketId) {
            io.to(marketmanagerSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, marketManager });
            console.log(`✅ Notification sent to Agent (${marketManager})`);
        } else {
            console.log(`⚠️ Agent (${agentId}) is offline. Notification skipped.`);
        }
        const districtmanagerSocketId = userSockets[dmManager];
        if (districtmanagerSocketId) {
            io.to(districtmanagerSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, dmManager });
            console.log(`✅ Notification sent to Agent (${dmManager})`);
        } else {
            console.log(`⚠️ Agent (${agentId}) is offline. Notification skipped.`);
        }
        const storeSocketId = userSockets[storeID];
        if (storeSocketId) {
            io.to(storeSocketId).emit('ticket closed by manager', { ticketId, status, completeBy: 'Manager', detail, storeID });
            console.log(`✅ Notification sent to Agent (${storeID})`);
        } else {
            console.log(`⚠️ Agent (${storeID}) is offline. Notification skipped.`);
        }
    })

    // Handle disconnection
    socket.on("notify", async ({ ticketId, ticket_Id, senderId, marketmanager, distrcitmanager, recipientId, notification_type }) => {
        try {
            console.log(`📢 Notification for Ticket ${ticket_Id} sent from ${senderId} to ${recipientId}`);
            // DEBUGGING - Emit to all
            io.emit("receiveNotification", {
                ticketId,
                ticket_Id,
                senderId,
                recipientId,
                marketmanager,
                distrcitmanager,
                notification_type,
                ieRead: false
            });

        } catch (error) {
            console.error("Error in notify event:", error);
        }
    });

    socket.on("disconnect", () => {

        console.log("❌ User disconnected:", socket.id);
        const userId = Object.keys(userSockets).find((key) => userSockets[key] === socket.id);
        if (userId) {
            delete userSockets[userId];
            socket.broadcast.emit('user offline', { userId, online: false });
            io.emit("updateOnlineUsers", Object.keys(userSockets));
        }
    });
    // Handle Reconnection
    socket.on("reconnect_attempt", (attempt) => {
        console.log(`🔄 Reconnection Attempt #${attempt} for ${socket.id}`);
    });
    // Handle user reconnection
    socket.on('reconnect', (userId) => {
        userSockets[userId] = socket.id;
        console.log(`🔄 User ${userId} reconnected with socket ID: ${socket.id}`);
        socket.broadcast.emit('user online', { userId, online: true });
    });
});

connectionDB()
    .then(res => console.log("db Connected"))
    .catch(err => console.log("DB NOT Connected", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Increase request size limit
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// OR (agar express >= 4.16 use kar rahe ho to built-in parser hai)
// ✅ INCREASED LIMIT — ye sabhi routes se PEHLE hona chahiye
app.use(express.json({ limit: "50mb", type: ["application/json", "text/plain"] }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use('/', router)


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});