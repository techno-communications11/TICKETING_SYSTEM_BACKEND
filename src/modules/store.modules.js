// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const storeSchema = new Schema({
//     bdi_id: {
//         type: String,
//         require: true
//     },
//     dm_name: {
//         type: String,
//         require: true
//     },
//     door_code: {
//         type: String,
//         require: true
//     }, market: {
//         type: String,
//         require: true
//     },
//     store_addres: {
//         type: String,
//         require: true
//     },
//     store_name: {
//         type: String,
//         require: true
//     },
//     stroe_email: {
//         type: String,
//         require: true
//     },
//     store_phone: {
//         type: String,
//         require: true
//     }

// }, { timestamps: true });


// const storeModule = mongoose.model("stores", storeSchema);

// export default storeModule;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // <-- apne DB connection ka path change kar lena

const Store = sequelize.define("Store", {
    bdi_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dm_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    door_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    market: {
        type: DataTypes.STRING,
        allowNull: true
    },
    store_addres: {   // typo fix karna hai to "store_address" kar lena
        type: DataTypes.STRING,
        allowNull: true
    },
    store_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stroe_email: {   // typo fix karna hai to "store_email" kar lena
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    store_phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "stores", // SQL table ka naam
    timestamps: true     // createdAt, updatedAt columns automatically add honge
});

export default Store;
