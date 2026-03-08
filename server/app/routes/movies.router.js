const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/all-movies', movieController.getAllMovies)
router.get('/all-tvShows', movieController.getAllTvShows)
router.get('/trending', movieController.getTrendingMovies)
router.get('/popular', movieController.getPopularMovies)
router.get('/top_rated', movieController.getTopRatedMovies)
router.get('/search/:query', movieController.getSearchedMovies)
router.get('/details/:id', movieController.getMovieDetails)
router.get('/trailer/:id', movieController.getMovieTrailer)

router.get('/trending-tv', movieController.getTrendingTvShows)
router.get('/popular-tv', movieController.getPopularTvShows)
router.get('/top_rated-tv', movieController.getTopRatedTvShows)
router.get('/search-tv/:query', movieController.getSearchedTvShows)
router.get('/details-tv/:id', movieController.getTvShowDetails)

// Custom Media Public Route
router.get('/custom-media', movieController.getPublicCustomMedia)

router.get('/cast/:id', movieController.getMovieCast)
router.get('/cast-tv/:id', movieController.getTvShowCast)
router.get('/person/:id', movieController.getPersonDetails)

module.exports = router;