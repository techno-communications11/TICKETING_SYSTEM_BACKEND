import db from '../modules/index.js';

const { mmdminfo: mmDMInfo } = db;


export const addMMDMInfoServices = async (payload) => {
    try {
        const cleanedPayload = payload.map(item => ({
            market: String(item.market || "").trim(),
            name: String(item.name || "").trim(),
            title: String(item.title || "").trim(),
            ntid: String(item.ntid || "").trim(),
            tmobile_email: String(item.tmobile_email || "").trim(),
            company_email: String(item.company_email || "").trim(),
            contact_numbers: String(item.contact_numbers || "").trim(),
        }));
        const response = await mmDMInfo.insertMany(cleanedPayload);
        return response;
    } catch (error) {
        console.log("ERROR FROM THERE", error.message)
        throw error;
    }
}

export const addMMDMInfoService = async (payload) => {
    try {
        const response = await mmDMInfo({...payload});
        return await response.save();
    } catch (error) {
        console.log("ERROR FROM THERE", error.message)
        throw error;
    }
}

export const getMMDMInfoService = async () => {
    try {
        const response = await mmDMInfo.find({}).exec();
        return response;
    } catch (error) {
        console.log("ERROR FROM THERE", error.message)
        throw error;
    }
}