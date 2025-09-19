import express from 'express';
import { deleteProblemCategoryController, getAllProblemsCategoryData, problemcategorycontrollers } from '../controllers/problemcategory.controllers.js';


const problemcategoryrouting=express.Router();


problemcategoryrouting.post("/addproblemcateroy",problemcategorycontrollers)
problemcategoryrouting.get('/getAlldata',getAllProblemsCategoryData)
problemcategoryrouting.post('/delete-problem-category',deleteProblemCategoryController)

export default problemcategoryrouting;