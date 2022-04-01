const mongoose = require('mongoose');

const IdSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    }
})

const Id = mongoose.model('IDs', IdSchema);
Id.createIndexes();
module.exports = Id;