const mongoose = require('mongoose');

const favoriteTvShowModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user id is required !"],
    },
    tvShow: {
        type: String,
        required: [true, "tvShow id is required !"]
    },
}, { timestamps: true });

favoriteTvShowModel.index({ user: 1, tvShow: 1 }, { unique: true });

module.exports = mongoose.model('favoriteTvShows', favoriteTvShowModel);
