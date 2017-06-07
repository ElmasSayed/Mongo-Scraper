var mongoose = require("mongoose");
// schema
var commentSchema = mongoose.Schema({
    articleId: {type:String, require:true},
    comment: {type:String, require:true},
    create_date: {type:Date, default: Date.now}
});

var Comment = module.exports = mongoose.model("Comment", commentSchema);

// ---------------------------------------

module.exports.getComments = function(callback, limit) {
    Comment.find(callback).limit(limit);
}

module.exports.saveComment = function(comment, callback) {
    Comment.create(comment, callback);
}

module.exports.deleteComment = function(comment, callback) {
    Comment.remove(comment, callback);
}
