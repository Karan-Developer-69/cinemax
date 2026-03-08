const FavoriteTvShow = require('../models/favoriteTvShow.model');

// Add a TV show to user's favorites
exports.addFavorite = async (req, res) => {
    try {
        const { userId, tvShowId } = req.body;

        if (!userId || !tvShowId) {
            return res.status(400).json({ message: "User ID and TV Show ID are required!" });
        }

        const newFavorite = await FavoriteTvShow.create({
            user: userId,
            tvShow: tvShowId
        });

        res.status(201).json({ message: "Added to favorites successfully", favorite: newFavorite });
    } catch (error) {
        // Handle duplicate key error (MongoDB code 11000)
        if (error.code === 11000) {
            return res.status(409).json({ message: "TV Show is already in favorites" });
        }
        res.status(500).json({ message: "Error adding favorite", error: error.message });
    }
};

// Remove a TV show from user's favorites
exports.removeFavorite = async (req, res) => {
    try {
        const { userId, tvShowId } = req.body;

        if (!userId || !tvShowId) {
            return res.status(400).json({ message: "User ID and TV Show ID are required!" });
        }

        const deletedFavorite = await FavoriteTvShow.findOneAndDelete({
            user: userId,
            tvShow: tvShowId
        });

        if (!deletedFavorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        res.status(200).json({ message: "Removed from favorites successfully", favorite: deletedFavorite });
    } catch (error) {
        res.status(500).json({ message: "Error removing favorite", error: error.message });
    }
};

// Get all favorite TV shows for a specific user
exports.getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required!" });
        }

        const favorites = await FavoriteTvShow.find({ user: userId });

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites", error: error.message });
    }
};
