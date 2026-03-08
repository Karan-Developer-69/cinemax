const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.router");
const movieRoutes = require('./routes/movies.router');
const favoriteRoutes = require('./routes/favoriteMovie.router');
const favoriteTvRoutes = require('./routes/favoriteTvShow.router');
const adminRoutes = require('./routes/admin.router');

const cors = require('cors');

app.use(cors({
    origin: process.env.FRONTEND_URL, // URL of your frontend
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const connectDB = require('./configs/db');

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: "Failed to connect to the database. Ensure your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas.", details: err.message });
    }
});


app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/favorites-tv', favoriteTvRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
