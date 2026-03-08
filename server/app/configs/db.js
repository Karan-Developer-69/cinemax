const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGO_URI || ""
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