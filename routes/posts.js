var express     = require("express"),
    router      = express.Router(),
    firebase    = require("firebase"),
    passport    = require("passport"),
    User        = require("../models/user"),
    Post        = require("../models/posts"),
    middleware  = require("../middleware");


// SHOW ALL POSTS
router.get("/", function(req,res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("posts/index", {posts: allPosts, currentUser: req.user, title:'Posts'});
        }
    }); 
});

// NEW - SHOW FORM TO CREATE NEW POST
router.get("/new",function(req,res){
    res.render("posts/new", {title:'New post'});
})

// CREATE - ADD NEW POST TO DB
router.post("/",function(req,res){
    var title = req.body.title,
        image = req.body.image,
        description = req.body.description;
    var author = { id: req.user._id, username: req.user.username, name: req.user.name };

    var newPost = {title: title, image: image, description: description, author: author, createdAt: Date.now()};

    Post.create(newPost, function(err, newlyCreatedPost){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});

// SHOW - SHOW THE FULL POST
router.get("/:id", function(req,res){
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            res.render("posts/show", {post: foundPost, title: foundPost.title})
        }
    })
});

// EDIT - EDIT THE POST
router.get("/:id/edit", function(req,res){
    Post.findById(req.params.id, function(err, foundPost){
        res.render("posts/edit", {post: foundPost, title: foundPost.title}); 
    });
});

// UPDATE - UPDATE POST ROUTE
router.put("/:id", function(req,res){
    var newData = {title: req.body.title, image: req.body.image, description: req.body.description}
    Post.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedPost){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// DESTROY - DESTROY THE POST
router.delete("/:id", function(req,res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    })
});

module.exports = router;