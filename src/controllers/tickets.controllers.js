import { getAllUserDataServices, getCurrentUserDataServices } from "../Servicess/auth.services.js";
import { sendemailServices, sendEmailToManagers, sendemailtomanagerServices } from "../Servicess/emailsend.services.js";
import { approvedTicketServices, assignTicketService, closedTicketFromAgentServices, completeTicketFromAgentServices, createTicketsServices, deleteTicketsService, deniedTicketServices, getAllTicketsDataServices, reopenTicketServices, updateAgnetStatusServices, updateTicketProgressService, updateTicketStatusService } from "../Servicess/tickets.services.js"

export const createTicketsControllers = async (req, res) => {
    try {
        const { ticketId, formData, email } = req.body;
        const response = await createTicketsServices(ticketId, formData);
        const sendemail = sendEmailToManagers(ticketId, formData, email);
        if (sendemail) return res.status(200).json({ status: 200, sucess: true, message: "sucessfully ticket save and also send mail", data: response })
        return res.status(200).json({ status: 200, sucess: true, message: "sucessfully ticket save just", data: response })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const getAllTicketsControllers = async (req, res) => {
    try {
        const response = await getAllTicketsDataServices()
        return res.status(200).json({ status: 200, sucess: true, message: "sucess get all tickets", data: response })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const assignedTicketController = async (req, res) => {
    try {
        const { id, assignerId, assignerName, ticketId, formData, email, assignedmanagername, assign_email, approved } = req.body;
        const response = await assignTicketService(id, assignerId, assignerName, assignedmanagername, assign_email, approved);
        const sendemail = await sendemailServices(ticketId, formData, email)
        if (sendemail) return res.status(200).json({ status: 200, sucess: true, message: "sucessfully ticket save and also send mail", data: response })
        return res.status(200).json({ status: 200, sucess: true, message: "sucess assign", })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export const updateTicektStatusControllers = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Ticket ID is required" });
        }

        const updatedTicket = await updateTicketStatusService(id);

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        return res.status(200).json({ success: true, message: "Ticket status updated", ticket: updatedTicket });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const updatingAgentStatusController = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ status: 400, success: false, message: "ID is required!" });
        }
        const response = await updateAgnetStatusServices(id);
        if (!response) {
            return res.status(404).json({ status: 404, success: false, message: "Ticket not found!" });
        }
        return res.status(200).json({ status: 200, success: true, message: "Successfully updated", data: response });

    } catch (error) {
        console.error("❌ Error in updatingAgentStatusController:", error.message);
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error", error: error.message });
    }
};

export const completeTicketFromAgentController = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await completeTicketFromAgentServices(id);
        return res.status(200).json({ status: 200, success: true, message: "Successfully updated", data: response });

    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error", error: error.message });
    }
}

export const closeTicketFromManagerController = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await closedTicketFromAgentServices(id)
        return res.status(200).json({ status: 200, success: true, message: "Successfully updated", data: response });

    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error", error: error.message });
    }
}

export const approvedTicketController = async (req, res) => {
    try {
        const { userId, ticketId } = req.body;
        const usersData = await getCurrentUserDataServices(userId);

        if (!usersData) {
            return res.status(404).json({ status: 404, success: false, message: "User not found" });
        }

        // ✅ approvedType set karo department ke basis par
        let approvedType = "";
        if (usersData.department === "District Manager") {
            approvedType = "District Manager";
        } else if (usersData.department === "Market Manager") {
            approvedType = "Market Manager";
        }
        const response = await approvedTicketServices(ticketId, approvedType)
        const sendemail = sendemailtomanagerServices(ticketId, response, response.managerName_email);
        if (sendemail) return res.status(200).json({ status: 200, sucess: true, message: "sucessfully ticket save and also send mail", data: response })
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Success",
            approvedType,  // ✅ approvedType response me bhejna
            response
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const updateTicketProgressController = async (req, res) => {
    try {
        const { ticketId, status } = req.body;

        const response = await updateTicketProgressService(ticketId, status);

        if (!response.success) {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// deniedTicketServices

export const deniedTicketController = async (req, res) => {
    try {
        const { userId, ticketId, reason } = req.body;
        const usersData = await getCurrentUserDataServices(userId);

        if (!usersData) {
            return res.status(404).json({ status: 404, success: false, message: "User not found" });
        }

        // ✅ approvedType set karo department ke basis par
        let approvedType = "";
        if (usersData.department === "District Manager") {
            approvedType = "District Manager";
        } else if (usersData.department === "Market Manager") {
            approvedType = "Market Manager";
        }
        const response = await deniedTicketServices(ticketId, approvedType, reason)
        // const sendemail = sendemailtomanagerServices(ticketId, response, response.managerName_email);
        // if (sendemail) return res.status(200).json({ status: 200, sucess: true, message: "sucessfully ticket save and also send mail", data: response })
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Success",
            approvedType,  // ✅ approvedType response me bhejna
            response
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const reopenTicketController = async (req, res) => {
    try {
        const { id, reopenreason } = req.body;
        console.log("REPSPONE FROM FRONTEND", { id, reopenreason })
        const response = await reopenTicketServices(id, reopenreason);
        if (!response) return res
        return res.status(200).json({ status: 200, success: true, message: "success" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

export const deleteTicketsController = async (req, res) => {
    try {
        const { ids } = req.body;

        // Validate input
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "⚠️ Please provide an array of ticket IDs!"
            });
        }

        const response = await deleteTicketsService(ids);

        return res.status(200).json({
            status: 200,
            message: response
        });
    } catch (error) {
        console.error("❌ Error in deleteTicketsController:", error.message);

        return res.status(500).json({
            status: 500,
            message: "❌ Internal Server Error!",
            error: error.message
        });
    }
};
