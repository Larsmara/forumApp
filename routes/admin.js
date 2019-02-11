var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Post        = require("../models/posts");

// ADMIN ROUTES
router.get("/admin", function(req,res){
    res.render("authentication/admin", {title:'Admin login'});
});

module.exports = router;