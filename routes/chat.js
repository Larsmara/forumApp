var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");


// SHOW CHAT FORM
router.get("/", function(req,res){
    res.render("chat/index", {title:'Chat'});
});

module.exports = router;