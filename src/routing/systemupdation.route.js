import express from 'express';
import { systemUpdatecontroller, systemupdationcontroller } from '../controllers/systemupdation.controller.js';

const systemupdationroutes= express.Router();


systemupdationroutes.post('/systemupdation',systemupdationcontroller)
systemupdationroutes.post('/systemUpdated',systemUpdatecontroller)


export default systemupdationroutes;