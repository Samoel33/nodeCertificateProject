const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is a required field'],

    },
    query: {
        type: String,
        required: [true, 'Query message is a required field']
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Query = mongoose.model('Queries', querySchema);

module.exports = Query;