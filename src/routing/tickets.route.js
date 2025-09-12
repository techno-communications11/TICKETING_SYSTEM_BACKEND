import express from 'express';
import { approvedTicketController, assignedTicketController, closeTicketFromManagerController, completeTicketFromAgentController, createTicketsControllers, deleteTicketsController, deniedTicketController, getAllTicketsControllers, reopenTicketController, updateTicektStatusControllers, updateTicketProgressController, updatingAgentStatusController } from '../controllers/tickets.controllers.js';


const ticketRoute = express.Router();

ticketRoute.post('/creatTickets',createTicketsControllers)
ticketRoute.get('/getalltickets',getAllTicketsControllers)
ticketRoute.post('/assignedTicket',assignedTicketController)
ticketRoute.post('/updateTicektStatus',updateTicektStatusControllers)
ticketRoute.post('/updatingAgentStatus',updatingAgentStatusController)
ticketRoute.post('/completeTicketFromAgent',completeTicketFromAgentController)
ticketRoute.post('/closeTicket',closeTicketFromManagerController)
ticketRoute.post('/approvedTicket',approvedTicketController);
ticketRoute.post('/updateTicketProgress',updateTicketProgressController);
ticketRoute.post('/deniedTicket',deniedTicketController);
ticketRoute.post('/reopenTicket',reopenTicketController)
ticketRoute.post('/delete-tickets',deleteTicketsController)


export default ticketRoute;