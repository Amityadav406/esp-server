const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    apiKey: { type: String, required: true },
    secretKey: { type: String, required: true }
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
