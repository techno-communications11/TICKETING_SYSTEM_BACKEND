import db from '../modules/index.js';
const { tickets: Ticket } = db;

// export const createTicketsServices = async (ticketId, payload) => {
//     try {
//         const requiredFields = ['market', 'userId', 'name', 'email', 'phone', 'category', 'store', 'ticketDescription', 'managerName', 'managerID'];
//         for (const field of requiredFields) {
//             if (!payload[field]) {
//                 throw new Error(`${field} is required`);
//             }
//         }
//         const newTicket = new Ticket.create({ ticketId, ...payload });
//         // const response = await newTicket.save();
//         // return newTicket.create();;
//         return newTicket;

//     } catch (error) {
//         console.error("Error creating ticket:", error);
//         throw error;
//     }
// };

export const createTicketsServices = async (ticketId, payload) => {
    try {
        const requiredFields = [
            'market', 'userId', 'name', 'email', 'phone',
            'category', 'store', 'ticketDescription', 'managerName', 'managerID'
        ];

        for (const field of requiredFields) {
            if (!payload[field]) {
                throw new Error(`${field} is required`);
            }
        }

        const newTicket = await Ticket.create({ ticketId, ...payload }); // ✅ no "new"
        return newTicket;

    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

export const getAllTicketsDataServices = async () => {
    try {
        // const response = await Ticket.find({});
        const response = await Ticket.findAll();
        return response;
    } catch (error) {
        throw error;
    }
}

// export const assignTicketService = async (id, assignerId, assignerName, assignedmanagername, assign_email) => {
//     try {
//         const response = await Ticket.findByIdAndUpdate(
//             id,
//             { assignerId, assignerName, assignedmanagername, assign_At: new Date(), assign_email },
//             { new: true }
//         );
//         if (!response) {
//             throw new Error("Ticket not found or update failed");
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// ticket.service.js
// import { Ticket } from "../models"; // Adjust path as needed
// import { Op } from "sequelize";

// export const assignTicketService = async (id, assignerId, assignerName, assignedmanagername, assign_email) => {
//     try {
//         // Update the ticket by its primary key (id)
//         const [updatedRowsCount, [updatedTicket]] = await Ticket.update(
//             {
//                 assignerId,
//                 assignerName,
//                 assignedmanagername,
//                 assign_At: new Date(),
//                 assign_email
//             },
//             {
//                 where: { id },           // condition
//                 returning: true,         // to get the updated row
//             }
//         );

//         if (updatedRowsCount === 0) {
//             throw new Error("Ticket not found or update failed");
//         }

//         return updatedTicket;
//     } catch (error) {
//         throw error;
//     }
// };

export const assignTicketService = async (id, assignerId, assignerName, assignedmanagername, assign_email, approved) => {
    try {
        const assignAt = new Date().toISOString();
        const [updatedRowsCount] = await Ticket.update(
            {
                assignerId,
                assignerName,
                assignedmanagername,
                assign_At: assignAt,
                assign_email,
                approved,
            },
            {
                where: { id }
            }
        );

        if (updatedRowsCount === 0) {
            throw new Error("Ticket not found or update failed");
        }

        const updatedTicket = await Ticket.findByPk(id);
        return updatedTicket;

    } catch (error) {
        throw error;
    }
};


export const updateTicketStatusService = async (ticketId) => {
    try {
        const [updatedRowsCount, [updatedTicket]] = await Ticket.update(
            { status: "open" },       // Fields to update
            {
                where: { id: ticketId }, // Match ticket by id
                returning: true,         // Return the updated row(s)
            }
        );

        if (updatedRowsCount === 0) {
            throw new Error("❌ Ticket not found");
        }

        return updatedTicket;
    } catch (error) {
        console.error("❌ Error in updateTicketStatusService:", error.message);
        throw error;
    }
};
// export const updateTicketStatusService = async (userId) => {
//     try {
//         const response = await Ticket.findByIdAndUpdate(
//             userId,
//             { status: "open" },
//             { new: true }
//         );

//         if (!response) {
//             throw new Error("Ticket not found");
//         }
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };
export const updateAgnetStatusServices = async (id) => {
    try {
        // Pehle ticket find karo
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return "❌ No ticket found with this ID!";
        }

        // Agar agentStatus "complete" hai to update nahi hoga
        if (ticket.agentstatus === "complete") {
            return "⚠️ Ticket is already marked as complete, update not allowed!";
        }

        // Agent status update karo
        ticket.agentstatus = "open";
        await ticket.save(); // Save changes to DB

        return ticket; // return the updated ticket
    } catch (error) {
        console.error("❌ Error in updateAgentStatusServices:", error.message);
        throw error;
    }
};

// export const updateAgnetStatusServices = async (id) => {
//     try {
//         // Pehle ticket find karo
//         const ticket = await Ticket.findById(id);
//         if (!ticket) {
//             return "❌ No ticket found with this ID!";
//         }

//         // Agar agentStatus "complete" hai to update nahi hoga
//         if (ticket.agentstatus === "complete") {
//             return "⚠️ Ticket is already marked as complete, update not allowed!";
//         }

//         // Agent status update karo
//         const updatedTicket = await Ticket.findByIdAndUpdate(
//             id,
//             { agentstatus: "open" },
//             { new: true }
//         );

//         return updatedTicket;
//     } catch (error) {
//         console.error("❌ Error in updateAgnetStatusServices:", error.message);
//         throw error;
//     }
// };

export const completeTicketFromAgentServices = async (_id) => {
    try {
        // Find ticket first
        const ticket = await Ticket.findByPk(_id);
        const completAt = new Date().toISOString();

        if (!ticket) {
            return "❌ No ticket found with this ID!";
        }

        // Update the ticket
        ticket.agentstatus = "complete";
        ticket.completedAt = completAt;

        await ticket.save(); // Save changes to DB

        return ticket; // return the updated ticket
    } catch (error) {
        console.error("❌ Error in completeTicketFromAgentServices:", error.message);
        throw error;
    }
};


// export const completeTicketFromAgentServices = async (_id) => {
//     try {
//         const response = await Ticket.findByIdAndUpdate(
//             _id,
//             {
//                 agentstatus: "complete",
//                 completedAt: new Date(),
//             },
//             { new: true }
//         );
//         if (!response) {
//             return ("❌ No ticket found with this ID!");
//         }
//         return response;
//     } catch (error) {
//         console.error("❌ Error in updateAgnetStatusServices:", error.message);
//         throw error;
//     }
// };
// export const closedTicketFromAgentServices = async (id) => {
//     try {
//         const response = await Ticket.findByIdAndUpdate(
//             id,
//             {
//                 status: "close",
//                 closedAt: new Date(),
//             },
//             { new: true }
//         );
//         if (!response) {
//             return ("❌ No ticket found with this ID!");
//         }
//         return response;
//     } catch (error) {
//         console.error("❌ Error in updateAgnetStatusServices:", error.message);
//         throw error;
//     }
// };

export const closedTicketFromAgentServices = async (id) => {
    try {
        // console.log(typeof(id))
        // update the ticket
        const [updatedRowsCount] = await Ticket.update(
            {
                status: "close",
                closedAt: new Date().toISOString(), // ✅ safe for MySQL DATETIME
            },
            { where: { id } }
        );

        if (updatedRowsCount === 0) {
            return "❌ No ticket found with this ID!";
        }

        // fetch updated ticket
        const updatedTicket = await Ticket.findByPk(id);
        return updatedTicket;

    } catch (error) {
        console.error("❌ Error in closedTicketFromAgentServices:", error.message);
        throw error;
    }
};


export const approvedTicketServices = async (_id, approve_by) => {
    try {
        const response = await Ticket.findByIdAndUpdate(
            _id,
            { approved: true, approve_by },
            { new: true, runValidators: true } // ✅ Ensuring updated doc & validation
        );

        if (!response) {
            throw new Error("Ticket not found or update failed"); // ✅ Handle invalid ID
        }

        return response;
    } catch (error) {
        console.error("Error in approvedTicketServices:", error.message);
        throw new Error("Database update failed: " + error.message); // ✅ Meaningful error message
    }
};

export const deniedTicketServices = async (_id, denial_by, reason) => {
    try {
        const response = await Ticket.findByIdAndUpdate(
            _id,
            { approved: false, approve_by: '', denial_by, reason },
            { new: true, runValidators: true } // ✅ Ensuring updated doc & validation
        );

        if (!response) {
            throw new Error("Ticket not found or update failed"); // ✅ Handle invalid ID
        }

        return response;
    } catch (error) {
        console.error("Error in approvedTicketServices:", error.message);
        throw new Error("Database update failed: " + error.message); // ✅ Meaningful error message
    }
};

// export const updateTicketProgressService = async (ticketId, status) => {
//     try {
//         const ticket = await Ticket.findById(ticketId);
//         if (!ticket) {
//             return { success: false, message: "Ticket not found" };
//         }
//         // ✅ Progress Add with Auto Time
//         ticket.progress.push({ status, time: new Date() });

//         await ticket.save();
//         return { success: true, message: "Progress updated successfully", ticket };
//     } catch (error) {
//         console.log("ERROR FROM updateTicketProgress SERVICE", error.message)
//         throw new Error(error.message);
//     }
// };

export const updateTicketProgressService = async (id, status) => {
    try {
        // Find ticket by primary key (id)
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return { success: false, message: "Ticket not found" };
        }

        // Update progress array
        let progressArray = ticket.progress || [];
        progressArray.push({ status, time: new Date() });

        await ticket.update({ progress: progressArray });

        return { success: true, message: "Progress updated successfully", ticket };
    } catch (error) {
        console.error("ERROR FROM updateTicketProgress SERVICE", error.message);
        throw new Error(error.message);
    }
};



export const reopenTicketServices = async (_id, reopenreason) => {
    try {
        const resposne = await Ticket.findByIdAndUpdate(
            _id,
            // { requestreopen: true, reopenreason, status: "re-open",reopendate:new Date() },
            // { new: true, runValidators: true }
            {
                requestreopen: true,
                reopenreason: reopenreason,
                status: "re-open",
                reopendate: new Date()
            },
            {
                new: true,
                runValidators: true
            }
        )
        return resposne;
    } catch (error) {
        console.log("ERROR FROM updateTicketProgress SERVICE", error.message)
        throw new Error(error.message);
    }
}