const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "DEFAULT_123";

module.exports.validateUser = async (req, res, next) => {
    const token = req.cookies('token');
    if (!token) {
        res.status(401).json({ message: "Please login/register first !" });
    }

    const id = jwt.verify(token, JWT_SECRET_KEY);
    const user = await userModel.findById(id);

    if (!user) {
        res.status(404).json({ message: "User not found !" });
    }

    if (user.isBanned) {
        return res.status(403).json({ message: "Your account has been banned." });
    }

    req.user = user;

    next();

}