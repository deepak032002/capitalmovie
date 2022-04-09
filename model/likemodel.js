const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({

    movieId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    poster_path: {
        type: String,
        required: true
    },

    vote_average: {
        type: String,
        required: true
    }

})

const Likes = mongoose.model('Likes', LikeSchema);
Likes.createIndexes();
module.exports = Likes;