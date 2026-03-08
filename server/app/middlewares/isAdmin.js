const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Replace with your env variable or exact logic you use for cookies
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key_here";

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // We assume token was signed with { userId } based on authController
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.userId || decoded._id); // Try both just in case

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden - Admin access required" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Failed to authenticate admin", error: error.message });
    }
};
