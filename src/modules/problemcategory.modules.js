// import mongoose from "mongoose";


// const { Schema } = mongoose;

// const probleCategorySchema = new Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     department: {
//         type: String,
//         require: true
//     },
//     department_email:{
//         type: String,
//         require: true
//     }
// }, { timestamps: true });


// const problemcategoryModule = mongoose.model("problmecategory", probleCategorySchema);


// export default problemcategoryModule;


import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Make sure this points to your MySQL Sequelize instance

const ProblemCategory = sequelize.define("ProblemCategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department_email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "problem_categories" // Optional: custom table name
});

export default ProblemCategory;
