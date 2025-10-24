import db from "../modules/index.js";

const { TicketProgress: TicketProgressBar } = db;

export const addNewTicketProgressServices = async (payload) => {
    try {
        const response = await TicketProgressBar.create({ ...payload });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllTicketProgressServices = async () => {
    try {
        const response = await TicketProgressBar.findAll();
        return response;
    } catch (error) {
        throw error;
    }
}