const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Name already taken create another"],
    },
    description: {
        type: String,
        required: [true, "Description of the news is a requirement"],
    },
    url: {
        type: String,
    },
    urlToImage: {
        type: String,
    },
    publishedAt: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
module.exports = News;