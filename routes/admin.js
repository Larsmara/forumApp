var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Post        = require("../models/posts");

// ADMIN ROUTES
router.get("/admin", function(req,res){
    if(req.user.isAdmin === true){
        Post.find({}, function(err, allPosts){
            User.find({}, function(err, allUsers){
                if(err){
                    console.log(err);
                } else {
                    res.render("authentication/dashboard", {currentUser: req.user, post: allPosts, user: allUsers, title:'Admin login'});
                }
            });
        });
    } else {
        res.send("Sorry!");
    }
});

router.get("/admin/users", function(req,res){
    if(req.user.isAdmin === true){
        User.find({}, function(err, allUsers){
            if(err){
                console.log(err);
            } else {
                res.render("admin/users", {currentUser: req.user, users: allUsers, title:'User dashboard'});
            }
        });
    } else {
        res.redirect("posts");
    }
});

router.get("/admin/posts", function(req,res){
    if(req.user.isAdmin === true){
        Post.find({}, function(err, allPosts){
            if(err){
                console.log(err);
            } else {
                res.render("admin/posts", {currentUser: req.user, posts: allPosts, title:'Posts dashboard'});
            }
        });
    } else {
        res.redirect("posts");
    }
});

// EDIT USER

// DELETE USERS
// DESTROY - DESTROY THE POST
router.delete("/:id", function(req,res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    })
});

// DELETE POSTS
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