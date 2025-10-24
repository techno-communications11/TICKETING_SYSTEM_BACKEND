import express from "express";
import { addTicketProgressController, getTicketProgressController } from "../controllers/ticketrogress.controller.js";

const ticketProgressRouter=express.Router();

ticketProgressRouter.get("/get-ticket-progress",getTicketProgressController)
ticketProgressRouter.post("/add-ticket-progress",addTicketProgressController)

export default ticketProgressRouter;