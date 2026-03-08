const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://homepc8890_db_user:qtVbMvzXwncbl4qZ@cluster0.we2je61.mongodb.net"

const connectDB = () => {
    mongoose.connect(MONGODB_URL).
        then(() => {
            console.log("DATABASE connected !");
        })
        .catch((err) => {
            console.log("Error while connecting Database : ", err.message);
        });
}

module.exports = connectDB;