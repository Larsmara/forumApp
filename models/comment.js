var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        name: String
    }
});

module.exports = mongoose.model("Comment", CommentSchema);