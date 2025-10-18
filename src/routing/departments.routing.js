import express from 'express';
import { addDepartmentsControllers, deleteDepartmentsController, getAllDepartmentsController, updateDepartmentsControllers } from '../controllers/departments.controllers.js';

const departmentRouting = express.Router();

departmentRouting.post('/add-departments', addDepartmentsControllers)
departmentRouting.get('/get-all-departments', getAllDepartmentsController)
departmentRouting.post('/delete-department', deleteDepartmentsController)
departmentRouting.post('/update-departments-controllers', updateDepartmentsControllers)


export default departmentRouting