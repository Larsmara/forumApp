var express     = require("express"),
    router      = express.Router(),
    Chat        = require("../models/chat"),
    User        = require("../models/user"),
    middleware  = require("../middleware");


// SHOW ALL POSTS
router.get("/", function(req,res){
    Chat.find({}, function(err, allChats){
        User.find({}, function(err, allUsers){
            if(err){
                console.log(err);
            } else {
                res.render("chat/index", {chat: allChats, currentUser: req.user, users:allUsers, title:'Chat'});
            }
        });
    }); 
});

// CREATE AND SEND CHAT MESSAGES
router.post("/", middleware.isLoggedIn, function(req,res){
    var chatMessage = req.body.chatMes;
    var author = { id: req.user.id, username: req.user.username, name: req.user.name };

    var newChat = {text: chatMessage, author: author, createdAt: Date.now()};

    Chat.create(newChat, function(err, newlyChat){
        if(err){
            console.log(err);
        }else{
            res.redirect("/chat");
        }
    });
});

module.exports = router;