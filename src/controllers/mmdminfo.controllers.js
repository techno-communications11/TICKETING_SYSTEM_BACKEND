import { addMMDMInfoService, addMMDMInfoServices, getMMDMInfoService } from "../Servicess/mmdminfo.services.js"

export const addNewMMDMInfoControllers = async (req, res) => {
    try {
        const { data } = req.body;
        const resposne = await addMMDMInfoServices(data);
        return res.status(200).json({ status: 200, message: "success", data: resposne })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, message: "internal server error", error: error.message })
    }
}

// getMMDMInfoService
export const addManuallyNewMMDMInfoController = async (req, res) => {
    try {
        const { data } = req.body;
        console.log("data", data)
        const resposne = await addMMDMInfoService(data);
        console.log("resposne", resposne)
        return res.status(200).json({ status: 200, message: "success", data: resposne })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, message: "internal server error", error: error.message })
    }
}

export const getNewMMDMInfoController = async (req, res) => {
    try {
        const resposne = await getMMDMInfoService();
        return res.status(200).json({ status: 200, message: "success", data: resposne })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, message: "internal server error", error: error.message })
    }
}