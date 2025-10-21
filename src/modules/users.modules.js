import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

const authModule = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4()
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
    },
    forgotpassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "Agent"
    }
}, {
    tableName: "users",
    timestamps: true
});

export default authModule;
