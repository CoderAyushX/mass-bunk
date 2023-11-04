const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const generateRandomAddress = () => {
    const length = Math.floor(Math.random() * (50 - 10 + 1)) + 10; 
    const randomString = Math.random().toString(36).substring(2, length + 2);
    return 'adr_' + randomString;
};
const formDataSchema = new Schema({
    address: {
        type: String,
        default: generateRandomAddress,
        unique: true,
    },
    name: { type: String, required: true },
    batch: { type: String, required: true },
    sec: { type: String, required: true },
    period: { type: String, required: true },
    time: { type: String, required: true },
    bunkMessage: { type: String, required: true },
    agreeCount: { type: Number, default: 0 },
    disagreeCount: { type: Number, default: 0 },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
