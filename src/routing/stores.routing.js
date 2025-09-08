import express from 'express';
import { addStoresExcelFormatDataController, addStoresFormatDataController, getAllStoresDataControllers } from '../controllers/stores.controllers.js';

const storesRouting = express.Router();

storesRouting.post("/addstoresformat", addStoresFormatDataController)
storesRouting.post("/addstoresexcelformat", addStoresExcelFormatDataController)
 storesRouting.get('/getAllStoresDataControllers',getAllStoresDataControllers)

export default storesRouting;