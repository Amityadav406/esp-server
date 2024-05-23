const jwt = require('jsonwebtoken');
const Business = require('../models/Business');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.decode(token);

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }

        const business = await Business.findById(user.businessId);
        jwt.verify(token, `${business.apiKey}:${business.secretKey}`);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};
