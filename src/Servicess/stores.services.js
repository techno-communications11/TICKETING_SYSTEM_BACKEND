import db from '../modules/index.js';

const { stores: Stores } = db;


// export const addStoresDataExcelFormatServices = async (payload) => {
//     try {
//         const response = await Stores.insertMany(payload, { ordered: false });
//         return response;
//     } catch (error) {
//         console.error('Error inserting stores:', error);
//         throw error;
//     }
// };

// // Bulk insert (Excel format data)
// export const addStoresDataExcelFormatServices = async (payload) => {
//     try {
//         // Sequelize me insertMany nahi hota → bulkCreate use karte hain
//         const response = await Stores.bulkCreate(payload, {
//             validate: true,   // validate karega model ke rules se
//             ignoreDuplicates: true // agar unique constraint hoga to duplicate ignore
//         });
//         return response;
//     } catch (error) {
//         console.error('Error inserting stores (bulk):', error);
//         throw error;
//     }
// };
export const addStoresDataExcelFormatServices = async (payload) => {
    try {
        if (!Array.isArray(payload) || payload.length === 0) {
            throw new Error("Invalid or empty payload");
        }

        // MySQL par returning: false thoda memory friendly
        const response = await Stores.bulkCreate(payload, {
            validate: true,
            ignoreDuplicates: true, // only if you have unique keys
            returning: false,
        });

        return response;
    } catch (error) {
        console.error("Error inserting stores (bulk):", error);
        throw error;
    }

    // try {
    //     const response = await Stores.bulkCreate(payload, { ignoreDuplicates: true });
    //     return response;
    // } catch (error) {
    //     console.error('Error inserting stores (bulk):', error);
    //     throw error;
    // }
};

export const addStoresDataFormatServices = async (payload) => {
    try {
        // console.log("STORE PAYLOAD:", payload)
        const response = await Stores.create({ ...payload });
        return response.save();
    } catch (error) {
        console.error('Error inserting stores:', error);
        throw error;
    }
};

export const getAllStoresDataServices = async () => {
    try {
        const response = await Stores.findAll();
        return response;
    } catch (error) {
        throw error;
    }
}
