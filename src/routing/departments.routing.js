import express from 'express';
import { addDepartmentsControllers } from '../controllers/departments.controllers.js';

const departmentRouting=express.Router();

departmentRouting.post('/addDepartments',addDepartmentsControllers)
departmentRouting.get('/getDepartments',addDepartmentsControllers)


export default departmentRouting