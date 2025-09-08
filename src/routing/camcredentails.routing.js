import expess from 'express';
import { addCamCredentailsController, getCamCredentailsController } from '../controllers/camcredentails.controllers.js';

const camcredentialRouting= expess.Router();

camcredentialRouting.post('/addCamCredentails',addCamCredentailsController)
camcredentialRouting.get('/getCamCredentails',getCamCredentailsController)

export default camcredentialRouting;