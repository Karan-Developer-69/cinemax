const express = require('express');
const router = express.Router();
const favoriteMovieController = require('../controllers/favoriteMovie.controller');

router.post('/add', favoriteMovieController.addFavorite);
router.post('/remove', favoriteMovieController.removeFavorite);
router.get('/:userId', favoriteMovieController.getFavorites);

module.exports = router;
