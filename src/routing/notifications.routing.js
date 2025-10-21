import express from 'express';
import { addNotificationsCOntroller, deleteNotificationsByIdController, getNotificationsController } from '../controllers/notifications.controllers.js';

const notificationRoute=express.Router();

notificationRoute.post('/addNotifications',addNotificationsCOntroller)
notificationRoute.get('/getNotifications',getNotificationsController)
notificationRoute.post('/updateNotification',getNotificationsController)
notificationRoute.post('/delete-notifications-by-id',deleteNotificationsByIdController)

export default notificationRoute;