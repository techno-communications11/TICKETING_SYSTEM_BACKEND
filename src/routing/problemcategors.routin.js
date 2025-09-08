import express from 'express';
import { getAllProblemsCategoryData, problemcategorycontrollers } from '../controllers/problemcategory.controllers.js';


const problemcategoryrouting=express.Router();


problemcategoryrouting.post("/addproblemcateroy",problemcategorycontrollers)
problemcategoryrouting.get('/getAlldata',getAllProblemsCategoryData)

export default problemcategoryrouting;