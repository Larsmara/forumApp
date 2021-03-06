var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    firebase    = require("firebase"),
    back        = require("express-back"),
    Post        = require("../models/posts"),
    Comment    = require("../models/comment"),
    User        = require("../models/user");



// ROOT ROUTE
router.get("/",function(req,res){
    console.log("HTTP Get Request");
    res.render("home", {title:'Homepage'});
});

// ABOUT ROUTE
router.get("/about", function(req,res){
    res.render("about", {title:'Om oss'});
});

// MY SITE ROUTE
router.get("/users", function(req,res){
    Post.find({}, function(err, myPosts){
        if(err){
            console.log(err);
        } else {
            Comment.find({}, function(err, myComments){
                if(err){
                    console.log(err);
                } else {
                    res.render("users/index", {posts: myPosts, comments: myComments,currentUser: req.user, title:'My site'});
                }
            })
        }
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req,res){
    res.render("authentication/login", {title:'Login'});
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res){});

// SHOW REGISTER FORM
router.get("/register", function(req,res){
    res.render("authentication/register", {title:'Register'});
});

// REGISTER LOGIC
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username, name: req.body.name, createdAt: Date.now()});
    if(req.body.adminCode === "lars") {
        newUser.isAdmin = true;
      }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                console.log(user.username + " Joined: " + user.createdAt + " " + user.name);
                res.redirect("/posts")
            });
        }
    })
});

// LOGOUT LOGIC
router.get("/logout", function(req,res){
    req.logOut();
    res.redirect("/");
});

module.exports = router;