const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "DEFAULT_123";

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            password: hash,
            email
        });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '24h' });

        res.cookie('token', token);
        res.status(201).json({
            message: "User created successfully",
            user: {
                email: user.email,
                username: user.username,
            }
        }
        );

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.isBanned) {
            return res.status(403).json({ message: "User is Banned by admin" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '24h' });

        res.cookie('token', token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                email: user.email,
                username: user.username,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId).select("-password -__v");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isBanned) {
            res.clearCookie("token");
            return res.status(403).json({ message: "Your account has been banned." });
        }

        res.status(200).json({ user });
    } catch (error) {
        // If token is expired or invalid
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};