import express from 'express';
import { getAllMempgisStructureController, newMempgisStructureController } from '../controllers/memphisStructure.controller.js';

const memphisRouting=express.Router();

memphisRouting.post('/newMempgisStructure',newMempgisStructureController)
memphisRouting.get('/getAllMempgisStructure',getAllMempgisStructureController)


export default memphisRouting;