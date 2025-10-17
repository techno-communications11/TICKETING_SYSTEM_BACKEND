import express from 'express';
import { addStoresExcelFormatDataController, addStoresFormatDataController, deleteStoresDataByIdControllers, getAllStoresDataControllers } from '../controllers/stores.controllers.js';

const storesRouting = express.Router();

storesRouting.post("/addstoresformat", addStoresFormatDataController)
storesRouting.post("/addstoresexcelformat", addStoresExcelFormatDataController)
storesRouting.get('/getAllStoresDataControllers',getAllStoresDataControllers)
storesRouting.post('/delete-store-data-by-id',deleteStoresDataByIdControllers)

export default storesRouting;