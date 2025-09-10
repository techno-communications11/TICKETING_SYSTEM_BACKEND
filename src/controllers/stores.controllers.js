import { addStoresDataExcelFormatServices, addStoresDataFormatServices, getAllStoresDataServices } from "../Servicess/stores.services.js";

const addStoresExcelFormatDataController = async (req, res) => {
    try {
        // Frontend se direct ARRAY aana chahiye (chunk)
        // But we also support { excelData: [...] } or { chunk: [...] } just in case
        const body = req.body;
        const payload = Array.isArray(body) ? body : body?.excelData ?? body?.chunk;
        console.log("👉 Raw body:", req.body);
        console.log("👉 Is array?", Array.isArray(req.body), "Length:", req.body?.length);

        if (!Array.isArray(payload)) {
            return res.status(400).json({ error: "Payload must be an array of rows" });
        }

        if (payload.length === 0) {
            return res.status(400).json({ error: "Empty array received" });
        }

        // (Optional) required fields check — pehle row se hi verify karlo
        const required = [
            "bdi_id", "dm_name", "door_code", "market",
            "store_addres", "store_name", "stroe_email", "store_phone"
        ];
        const missing = payload
            .map((row, idx) => {
                const miss = required.filter((k) => row[k] == null || row[k] === "");
                return miss.length ? { index: idx, missing: miss } : null;
            })
            .filter(Boolean);

        if (missing.length) {
            return res.status(400).json({
                error: "Validation failed: required fields missing",
                details: missing.slice(0, 3), // first few examples
            });
        }

        const result = await addStoresDataExcelFormatServices(payload);
        return res.status(200).json({ inserted: result.length });
    } catch (err) {
        console.error("Upload controller error:", err);

        if (err.name === "SequelizeValidationError") {
            return res.status(400).json({
                error: "SequelizeValidationError",
                details: err.errors?.map(e => ({
                    path: e.path, message: e.message, value: e.value
                }))
            });
        }

        return res.status(500).json({ error: err.message || "Internal error" });
    }
    // try {
    //     const { excelData } = req.body;
    //     const response = await addStoresDataExcelFormatServices(excelData);
    //     return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    // } catch (error) {
    //     return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    // }
}

const addStoresFormatDataController = async (req, res) => {
    try {
        const { obj } = req.body;
        console.log("obj", obj)
        const response = await addStoresDataFormatServices(obj);
        return res.status(200).json({ status: 200, sucess: true, message: "sucess" })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

const getAllStoresDataControllers = async (req, res) => {
    try {
        const response = await getAllStoresDataServices();
        return res.status(200).json({ status: 200, sucess: true, message: "sucess", data: response })
    } catch (error) {
        return res.status(500).json({ status: 500, sucess: false, message: "internal server error", error: error.message })
    }
}

export {
    addStoresExcelFormatDataController,
    getAllStoresDataControllers,
    addStoresFormatDataController
}