const movieProvider = require('../configs/movie.provider');
const mongoose = require('mongoose');
const CustomMovie = require('../models/customMovie.model');
const CustomTvShow = require('../models/customTvShow.model');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieProvider.getMovies();
        const customMovies = await CustomMovie.find().sort({ createdAt: -1 });
        const mappedCustom = customMovies.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'movie'
        }));
        res.status(200).json([...mappedCustom, ...movies]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
};

exports.getSearchedMovies = async (req, res) => {
    try {
        const query = req.params.query;

        if (!query) return res.status(400).json({ message: "Please give the movie name !" })

        const movies = await movieProvider.getSearchedMovie(query);
        const customMovies = await CustomMovie.find({ title: { $regex: query, $options: 'i' } });
        const mappedCustom = customMovies.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'movie'
        }));

        res.status(200).json([...mappedCustom, ...movies]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
}

exports.getMovieDetails = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).json({ message: "Please give the movie id !" });

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            const customMovie = await CustomMovie.findById(id);
            if (customMovie) {
                return res.status(200).json({
                    id: customMovie._id,
                    title: customMovie.title,
                    vote_average: customMovie.rating,
                    runtime: customMovie.runtime,
                    release_date: customMovie.year ? `${customMovie.year}-01-01` : null,
                    poster_path: customMovie.posterUrl,
                    backdrop_path: customMovie.backdropUrl || customMovie.posterUrl,
                    genres: customMovie.genres.map((g, i) => ({ id: i, name: g })),
                    overview: customMovie.overview,
                    isCustom: true
                });
            }
        }

        const movie = await movieProvider.getMovieDetails(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie details", error: error.message });
    }
}

exports.getTvShowDetails = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).json({ message: "Please give the tv show id !" })

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            const customTv = await CustomTvShow.findById(id);
            if (customTv) {
                return res.status(200).json({
                    id: customTv._id,
                    name: customTv.title,
                    vote_average: customTv.rating,
                    first_air_date: customTv.year ? `${customTv.year}-01-01` : null,
                    poster_path: customTv.posterUrl,
                    backdrop_path: customTv.backdropUrl || customTv.posterUrl,
                    genres: customTv.genres.map((g, i) => ({ id: i, name: g })),
                    overview: customTv.overview,
                    number_of_seasons: customTv.seasons,
                    isCustom: true
                });
            }
        }

        const show = await movieProvider.getTvShowDetails(id);
        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tv show details", error: error.message });
    }
}

exports.getMovieTrailer = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).json({ message: "Please give the movie id !" })

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            const customMovie = await CustomMovie.findById(id);
            if (customMovie && customMovie.trailerKey) {
                return res.status(200).json(customMovie.trailerKey);
            }
            const customTv = await CustomTvShow.findById(id);
            if (customTv && customTv.trailerKey) {
                return res.status(200).json(customTv.trailerKey);
            }
        }

        const movie = await movieProvider.getMovieTrailer(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie trailer", error: error.message });
    }
}


exports.getAllTvShows = async (req, res) => {
    try {
        const shows = await movieProvider.getTvShows();
        const customTv = await CustomTvShow.find().sort({ createdAt: -1 });
        const mappedCustom = customTv.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'tv'
        }));
        res.status(200).json([...mappedCustom, ...shows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching TV shows", error: error.message });
    }
};

exports.getTrendingMovies = async (req, res) => {
    try {
        const movies = await movieProvider.getTrendingMovies();
        const customMovies = await CustomMovie.find().sort({ createdAt: -1 }).limit(3);
        const mappedCustom = customMovies.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'movie'
        }));
        res.status(200).json([...mappedCustom, ...movies]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message })
    }
}

exports.getPopularMovies = async (req, res) => {
    try {
        const movies = await movieProvider.getPopularMovies();
        const customMovies = await CustomMovie.find().sort({ createdAt: -1 }).limit(3);
        const mappedCustom = customMovies.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'movie'
        }));
        res.status(200).json([...mappedCustom, ...movies]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching popular movies", error: error.message })
    }
}

exports.getTopRatedMovies = async (req, res) => {
    try {
        const movies = await movieProvider.getTopRatedMovies();
        const customMovies = await CustomMovie.find().sort({ rating: -1 }).limit(3);
        const mappedCustom = customMovies.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'movie'
        }));
        res.status(200).json([...mappedCustom, ...movies]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top rated movies", error: error.message })
    }
}

exports.getTrendingTvShows = async (req, res) => {
    try {
        const shows = await movieProvider.getTrendingTvShows();
        const customTv = await CustomTvShow.find().sort({ createdAt: -1 }).limit(3);
        const mappedCustom = customTv.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'tv'
        }));
        res.status(200).json([...mappedCustom, ...shows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trending TV shows", error: error.message });
    }
}

exports.getPopularTvShows = async (req, res) => {
    try {
        const shows = await movieProvider.getPopularTvShows();
        const customTv = await CustomTvShow.find().sort({ createdAt: -1 }).limit(3);
        const mappedCustom = customTv.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'tv'
        }));
        res.status(200).json([...mappedCustom, ...shows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching popular TV shows", error: error.message });
    }
}

exports.getTopRatedTvShows = async (req, res) => {
    try {
        const shows = await movieProvider.getTopRatedTvShows();
        const customTv = await CustomTvShow.find().sort({ rating: -1 }).limit(3);
        const mappedCustom = customTv.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'tv'
        }));
        res.status(200).json([...mappedCustom, ...shows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top rated TV shows", error: error.message });
    }
}

exports.getSearchedTvShows = async (req, res) => {
    try {
        const query = req.params.query;
        if (!query) return res.status(400).json({ message: "Please give the tv show name !" })

        const shows = await movieProvider.getSearchedTvShow(query);
        const customTv = await CustomTvShow.find({ title: { $regex: query, $options: 'i' } });
        const mappedCustom = customTv.map(m => ({
            id: m._id, title: m.title, rating: m.rating, year: m.year,
            imageSrc: m.posterUrl, type: 'tv'
        }));
        res.status(200).json([...mappedCustom, ...shows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching TV shows", error: error.message });
    }
}

exports.getPublicCustomMedia = async (req, res) => {
    try {
        const movies = await CustomMovie.find().sort({ createdAt: -1 });
        const tvShows = await CustomTvShow.find().sort({ createdAt: -1 });

        const mappedMovies = movies.map(m => ({
            id: m._id,
            title: m.title,
            rating: m.rating,
            year: m.year,
            imageSrc: m.posterUrl,
            type: 'movie'
        }));

        const mappedTvShows = tvShows.map(s => ({
            id: s._id,
            title: s.title,
            rating: s.rating,
            year: s.year,
            imageSrc: s.posterUrl,
            type: 'tv'
        }));

        res.status(200).json([...mappedMovies, ...mappedTvShows]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching custom media", error: "Failed" });
    }
};
