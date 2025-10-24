
import express from 'express'
import authrouter from './auth.js';
import chat_messageRoute from './chat_messages.route.js';
import problemcategoryrouting from './problemcategors.routin.js';
import storesRouting from './stores.routing.js';
import ticketRoute from './tickets.route.js';
import departmentRouting from './departments.routing.js';
import notificationRoute from './notifications.routing.js';
import logsRouting from './logs.route.js';
import systemupdationroutes from './systemupdation.route.js';
import mmdminfoRouting from './addmmdminfo.routing.js';
import camcredentialRouting from './camcredentails.routing.js';
import employeeContactRouting from './employeecontact.routing.js';
import memphisRouting from './memphisStructutre.routing.js';
import commentRouter from './comment.routing.js';
import ticketProgressRouter from './ticketprogress.routing.js';

const router = express.Router();

router.use('/auth/', authrouter);
router.use('/chat/', chat_messageRoute);
router.use('/pcategory/', problemcategoryrouting);
router.use('/stores/', storesRouting);
router.use('/tickets/', ticketRoute);
router.use('/department/', departmentRouting);
router.use('/notifications', notificationRoute);
router.use('/logs', logsRouting)
router.use('/updation', systemupdationroutes)
router.use('/mmdminfo', mmdminfoRouting)
router.use('/camcast', camcredentialRouting)
router.use('/employee', employeeContactRouting)
router.use('/memphis', memphisRouting)
router.use('/comment', commentRouter)
router.use('/ticket-progress', ticketProgressRouter)
router.get("/ping", (req, res) => {
    console.log("Ping received at:", new Date().toLocaleTimeString());
    res.send("Server is awake!");
});

export default router;
