import express from 'express';
import { addmanuallynewemployeecontroller, getEmployeeController } from '../controllers/employeecontact.controller.js';

const employeeContactRouting= express.Router();


employeeContactRouting.post('/addmanuallynewemployee',addmanuallynewemployeecontroller)
employeeContactRouting.get('/getEmployee',getEmployeeController)



export default employeeContactRouting;