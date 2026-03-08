const mongoose = require('mongoose');

const customMovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    posterUrl: { type: String, required: true },
    backdropUrl: { type: String },
    rating: { type: Number, default: 0 },
    year: { type: String },
    runtime: { type: Number },
    trailerKey: { type: String },
    genres: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("CustomMovie", customMovieSchema);
