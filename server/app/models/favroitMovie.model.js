const mongoose = require('mongoose');

const favroitMovieModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"user id is required !"],
    },
    movie:{
        type:String,
        required:[true,"movie id is required !"]
    },
},{timestamps:true});

favroitMovieModel.index({user:1,movie:1},{unique:true});

module.exports = mongoose.model('favroitMovies',favroitMovieModel);