const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({

    message: {
        type: String,
        required: true,
    },

    user: {
        type: Object,
        required: true,
    },

    movieId: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    }
})

const Comments = mongoose.model('Comments', CommentSchema);
Comments.createIndexes();
module.exports = Comments;