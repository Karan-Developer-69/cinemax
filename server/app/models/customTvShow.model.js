const mongoose = require('mongoose');

const customTvShowSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    posterUrl: { type: String, required: true },
    backdropUrl: { type: String },
    rating: { type: Number, default: 0 },
    year: { type: String }, // First air date year
    seasons: { type: Number, default: 1 },
    trailerKey: { type: String },
    genres: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("CustomTvShow", customTvShowSchema);
