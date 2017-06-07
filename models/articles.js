var mongoose = require("mongoose");
// schema
var articleSchema = mongoose.Schema({
    title: {type:String, require:true},
    link: {type:String, require:true},
    imageUrl: {type:String, require:true},
    create_date: {type:Date, default: Date.now}
});

var Article = module.exports = mongoose.model("Article", articleSchema);

// ---------------------------------------

module.exports.getArticles = function(callback, limit) {
    Article.find(callback).limit(limit);
}

module.exports.saveArticle = function(article, callback) {
    Article.create(article, callback);
}

module.exports.deleteArticle = function(article, callback) {
    Article.remove(article, callback);
}