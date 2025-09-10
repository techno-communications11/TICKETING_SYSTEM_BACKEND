import mongoose from 'mongoose';

const { Schema } = mongoose;

const mmdminfoSchema = new Schema({
    market: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    ntid: { type: String, default:null },
    tmobile_email: { type: String, default:null },
    company_email: { type: String, required: true },
    contact_numbers: { type: String, required: true },
}, { timestamps: true });

const mmdminfomodule = mongoose.model('mmdminfo', mmdminfoSchema);

export default mmdminfomodule