const CustomMovie = require('../models/customMovie.model');
const CustomTvShow = require('../models/customTvShow.model');

// ================= MOVIES =================

exports.createMovie = async (req, res) => {
    try {
        const newMovie = await CustomMovie.create(req.body);
        res.status(201).json({ message: "Movie created successfully", movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: "Error creating movie", error: error.message });
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await CustomMovie.find().sort({ createdAt: -1 });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await CustomMovie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: "Error updating movie", error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await CustomMovie.findByIdAndDelete(id);
        if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
};

// ================= TV SHOWS =================

exports.createTvShow = async (req, res) => {
    try {
        const newTvShow = await CustomTvShow.create(req.body);
        res.status(201).json({ message: "TV Show created successfully", tvShow: newTvShow });
    } catch (error) {
        res.status(500).json({ message: "Error creating TV Show", error: error.message });
    }
};

exports.getTvShows = async (req, res) => {
    try {
        const shows = await CustomTvShow.find().sort({ createdAt: -1 });
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching TV Shows", error: error.message });
    }
};

exports.updateTvShow = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTvShow = await CustomTvShow.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTvShow) return res.status(404).json({ message: "TV Show not found" });

        res.status(200).json({ message: "TV Show updated successfully", tvShow: updatedTvShow });
    } catch (error) {
        res.status(500).json({ message: "Error updating TV Show", error: error.message });
    }
};

exports.deleteTvShow = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTvShow = await CustomTvShow.findByIdAndDelete(id);
        if (!deletedTvShow) return res.status(404).json({ message: "TV Show not found" });

        res.status(200).json({ message: "TV Show deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting TV Show", error: error.message });
    }
};
