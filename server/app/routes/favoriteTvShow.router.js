const express = require('express');
const router = express.Router();
const favoriteTvShowController = require('../controllers/favoriteTvShow.controller');

router.post('/add', favoriteTvShowController.addFavorite);
router.post('/remove', favoriteTvShowController.removeFavorite);
router.get('/:userId', favoriteTvShowController.getFavorites);

module.exports = router;
