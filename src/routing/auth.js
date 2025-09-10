import express from "express";
import { deleteUser, getAllUsers, login, registered, resetUserPasswordAutomaticallyController, updateUserPasswordController, userUsedInDesktopController } from "../controllers/auth.controllers.js";

const authrouter = express.Router();

authrouter.post('/registered',registered);
authrouter.post('/login',login)
authrouter.post('/reset-password',updateUserPasswordController)
authrouter.get('/userdata',getAllUsers)
authrouter.delete('/deleteUser/:id',deleteUser)
authrouter.post('/resetUserPasswordAutomatically',resetUserPasswordAutomaticallyController)
authrouter.post('/userUsedInDesktop',userUsedInDesktopController)

export default authrouter;