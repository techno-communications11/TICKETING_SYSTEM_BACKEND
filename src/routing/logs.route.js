import express from 'express';
import { getAllLogsControllers } from '../controllers/logs.services.js';

const logsRouting= express.Router();

logsRouting.get('/getAllLogs',getAllLogsControllers)


export default logsRouting;