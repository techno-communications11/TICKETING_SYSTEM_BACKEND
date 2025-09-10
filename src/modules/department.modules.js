import mongoose from "mongoose";

const { Schema } = mongoose;


const departmentSchema = new Schema({
    name: {
        type: String,
        require: true
    }
}, { timestamps: true });

const departmentModule = mongoose.model('departments', departmentSchema);

export default departmentModule