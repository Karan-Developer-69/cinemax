require('dotenv').config()

const app = require("./app/app");
const PORT = process.env.PORT
const connectDB = require('./app/configs/db')

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();

module.exports = app;