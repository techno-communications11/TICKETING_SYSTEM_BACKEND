import mongoose from "mongoose";

const { Schema } = mongoose;

const memphisSchema = new Schema({
    storeName: {
        type: String,
        require: true
    },
    bidId: {
        type: String,
        require: true
    },
    salesDm: {
        type: String,
        require: true
    },
    compilanceDm: {
        type: String,
        require: true
    },
    dist: {
        type: String,
        require: true
    }
}, { timestamps: true });

const memphisModule = mongoose.model('memphisstructure', memphisSchema);

export default memphisModule;