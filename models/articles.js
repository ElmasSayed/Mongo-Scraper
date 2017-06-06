var mongoose = require("mongoose");
// schema
var articleSchema = mongoose.Schema({
    title: {
        String
    },
    link: {
        String
    },
    imageUrl: {
        String
    }
});

var Article = module.exports = mongoose.model("Article", articleSchema);

// ---------------------------------------

module.exports.getArticles = function(callback, limit) {
    Article.find(callback).limit(limit);
}

module.exports.saveArticle = function(article, callback) {
    Article.create(article, callback);
}