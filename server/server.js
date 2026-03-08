require('dotenv').config()

const app = require("./app/app");
const PORT = process.env.PORT
const connectDB = require('./app/configs/db')

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

connectDB();