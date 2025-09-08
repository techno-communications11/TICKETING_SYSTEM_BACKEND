import express from 'express';
import { addManuallyNewMMDMInfoController, addNewMMDMInfoControllers, getNewMMDMInfoController } from '../controllers/mmdminfo.controllers.js';

const mmdminfoRouting= express.Router();

// getNewMMDMInfoController
mmdminfoRouting.post('/addNewMMDMInfo',addNewMMDMInfoControllers)
mmdminfoRouting.post('/addmanuallyNewMMDMInfo',addManuallyNewMMDMInfoController)
mmdminfoRouting.get('/getNewMMDMInfoController',getNewMMDMInfoController)


export default mmdminfoRouting;