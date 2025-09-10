import express from 'express';
import { getAllMessages } from '../controllers/chat_messages.controllers.js';

const chat_messageRoute = express.Router();

chat_messageRoute.get('/messages/:userId/:currentID', getAllMessages)
// In your server code
// app.get('/messages/:userId', );

export default chat_messageRoute;