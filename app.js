var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

    // ROUTES
    var authRoute       = require("./routes/index"),
        postRoute       = require("./routes/posts"),
        chatRoute       = require("./routes/chat"),
        commentRoute    = require("./routes/comments");

mongoose.connect("mongodb://localhost:27017/forum", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Teste user management",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoute);
app.use("/posts", postRoute);
app.use("/chat", chatRoute);
app.use("/posts/:id/comments", commentRoute);

app.listen(3000, function(){
    console.log("Forum app startet");
});