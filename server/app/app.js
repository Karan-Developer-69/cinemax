const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.router");
const movieRoutes = require('./routes/movies.router');
const favoriteRoutes = require('./routes/favoriteMovie.router');
const favoriteTvRoutes = require('./routes/favoriteTvShow.router');
const adminRoutes = require('./routes/admin.router');

const path = require('path')

const cors = require('cors');

app.use(cors({
    origin: process.env.FRONTEND_URL, // URL of your frontend
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/favorites-tv', favoriteTvRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
