const Business = require('../models/Business');
const crypto = require('crypto');

exports.registerBusiness = async (req, res) => {
    try {
        const { name, registrationNumber, email, phone, address } = req.body;

        const apiKey = crypto.randomBytes(16).toString('hex');
        const secretKey = crypto.randomBytes(32).toString('hex');

        const business = new Business({
            name,
            registrationNumber,
            email,
            phone,
            address,
            apiKey,
            secretKey
        });

        await business.save();

        res.json({ apiKey, secretKey });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
