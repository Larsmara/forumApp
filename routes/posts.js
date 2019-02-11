var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Post        = require("../models/posts");


// SHOW ALL POSTS
router.get("/", function(req,res){
    res.render("posts/index", {title:'Posts'});
});

module.exports = router;