const User = require('../models/User');
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, phone, password, email, address, apiKey, secretKey } = req.body;

        const business = await Business.findOne({ apiKey, secretKey });
        if (!business) {
            return res.status(401).json({ error: 'Invalid API key or secret' });
        }

        const user = new User({ name, phone, password, email, address, businessId: business._id });
        await user.save();

        res.json({ name, phone, email, address });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid phone or password' });
        }

        const business = await Business.findById(user.businessId);
        const token = jwt.sign({ userId: user._id }, `${business.apiKey}:${business.secretKey}`, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone, email, address } = req.body;

        const user = await User.findByIdAndUpdate(userId, { name, phone, email, address }, { new: true });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        await User.findByIdAndDelete(userId);

        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
