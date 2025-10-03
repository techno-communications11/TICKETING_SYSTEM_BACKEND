// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const authSchema = new Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         default: null
//         // require: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     original_password: {
//         type: String,
//         require: true
//     },
//     phone: {
//         type: String,
//         require: true
//     },
//     department: {
//         type: String,
//         require: true
//     },
//     subDepartment: {
//         type: String,
//         default: null
//     },
//     doorcode: {
//         type: String,
//         default: null
//     },
//     profile_image: {
//         type: String,
//         default: null
//     },
//     tickets: {
//         type: [Object],
//         default: []
//     },
//     stores: {
//         type: [String],
//         default: [null]
//     },
//     markets: {
//         type: [String],
//         default: null
//     },
//     store_detail: {
//         type: [Object],
//         default: [null]
//     },
//     first: {
//         type: Boolean,
//         default: false
//     },
//     permissions: {
//         setting: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         store: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         users: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         ticket: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         market: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         marketmnager: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         },
//         marketdistrictmanager: {
//             type: Boolean,
//             default: false,
//             futureTyoes: {
//                 read: {
//                     type: Boolean,
//                     default: false
//                 },
//                 write: {
//                     type: Boolean,
//                     default: false
//                 },
//                 update: {
//                     type: Boolean,
//                     default: false
//                 },
//                 delete: {
//                     type: Boolean,
//                     default: false
//                 }
//             }
//         }
//     },
//     acocunt_status: {
//         type: Boolean,
//         default: false
//     },
//     bocked: {
//         type: Boolean,
//         default: false
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     managedDepartments: {
//         type: [String],
//         default: null
//     },
//     hasNewUpdate: { type: Boolean, default: false },
//     updateMessage: { type: String, default: "" },
//     updateDate: { type: Date },
//     desktop:{
//         type: Boolean,
//         default: false
//     }

// }, { timestamps: true });

// const authModule = mongoose.model('users', authSchema);

// export default authModule;
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // yaha tumhara sequelize connection file
import { v4 as uuidv4 } from 'uuid';

const authModule = sequelize.define("User", {
    // id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4,
    //     primaryKey: true,
    // },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4() // MongoDB style unique ID
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    original_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    doorcode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    tickets: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    stores: {
        type: DataTypes.JSON,
        defaultValue: [null]
    },
    markets: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    store_detail: {
        type: DataTypes.JSON,
        defaultValue: [null]
    },
    first: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    permissions: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    acocunt_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    bocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    managedDepartments: {
        type: DataTypes.JSON,
        defaultValue: null
    },
    hasNewUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    updateMessage: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    desktop: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "users",
    timestamps: true
});

export default authModule;
