import express from 'express';
import { deleteLogsControllers, getAllLogsControllers } from '../controllers/logs.services.js';

const logsRouting = express.Router();

logsRouting.get('/getAllLogs', getAllLogsControllers)
logsRouting.post('/delete-logs', deleteLogsControllers)


export default logsRouting;