const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGO_URI || "";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return mongoose.connection;
    }

    try {
        const db = await mongoose.connect(MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, // Important for Vercel: fail fast if IP is not whitelisted
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("DATABASE connected !");
        return db;
    } catch (err) {
        console.log("Error while connecting Database : ", err.message);
        throw err;
    }
}

module.exports = connectDB;