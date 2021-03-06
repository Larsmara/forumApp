var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Post        = require("../models/posts"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

//=====================================================
// COMMENT ROUTES
//=====================================================

// NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req,res){
    console.log(req.params.id);
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post, title:'New comment'});
        }
    });
});

// CREATE & POST COMMENT
router.post("/", middleware.isLoggedIn, function(req,res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // Add username, name and id to comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.name     = req.user.name;
                    // Save comment
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    console.log(comment);
                    res.redirect("/posts/" + post._id);
                }
            });
        }
    });
});

// EDIT COMMENT
router.get("/:comment_id/edit", function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        } else {
            res.render("comments/edit", {post_id: req.params.id, comment: foundComment, title:'Edit comment'});
        }
    });
});

// UPDATE COMMENT
router.put("/:comment_id", function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("edit");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// DELETE COMMENT
router.delete("/:comment_id", function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            console.log("Kommentar fjernet!");
            res.redirect("back");
        }
    });
});


module.exports = router;

