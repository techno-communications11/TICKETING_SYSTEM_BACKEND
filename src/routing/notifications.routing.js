import express from 'express';
import { addNotificationsCOntroller, getNotificationsController } from '../controllers/notifications.controllers.js';

const notificationRoute=express.Router();

notificationRoute.post('/addNotifications',addNotificationsCOntroller)
notificationRoute.get('/getNotifications',getNotificationsController)
notificationRoute.post('/updateNotification',getNotificationsController)

export default notificationRoute;