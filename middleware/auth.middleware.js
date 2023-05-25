require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const SECRET_KEY = process.env.SECRET_KEY;


const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(decoded.id);
            req.user = user;
            next();
        }else{
            return res.status(401).send({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        return res.status(401).send({ message: error.message });
    }
}
module.exports = AuthMiddleware;