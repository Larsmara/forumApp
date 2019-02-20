var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    firebase        = require("firebase"),
    admin           = require("firebase-admin"),
    serviceAccount  = require("./firebaseForum-key.json"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    back            = require("express-back"),
    session         = require("express-session"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

    // ROUTES
    var authRoute       = require("./routes/index"),
        postRoute       = require("./routes/posts"),
        chatRoute       = require("./routes/chat"),
        commentRoute    = require("./routes/comments"),
        adminRoute      = require("./routes/admin");

        

mongoose.connect("mongodb://localhost:27017/forum", {useNewUrlParser: true});
/* mongoose.connect("mongodb://lars:lars12345@ds331735.mlab.com:31735/forum_lars", {useNewUrlParser: true}); */

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//app.use(back());

app.set('trust proxy', '');
app.use(session({
    secret: 'Lars sitt forum',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}));

app.use(require("express-session")({
    secret: "Teste user management",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require("moment");

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
app.use(adminRoute);

app.listen(3000, function(){
    console.log("Forum app startet");
});

/* app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Forum app startet");
}); */