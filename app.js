var express       =require("express");
var app           =express();
var bodyParser    =require("body-parser");
var mongoose      =require("mongoose");
var Campground    =require("./models/campground");
var seedDB        =require("./seeds");
var Comment       =require("./models/comment");
var passport      =require("passport");
var LocalStrategy =require("passport-local");
var User          =require("./models/user");
var methodOverride=require("method-override");
var flash         =require("connect-flash");

// require all diff routes //mk diff directory 4 all diff routes
var commentRoutes       =require("./routes/comments"),
	campgroundRoutes    =require("./routes/campgrounds"),
	indexRoutes         =require("./routes/index")


// start seeding : run fun seedDB
//seedDB();
// db setup
 // mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true});
mongoose.connect("mongodb+srv://garry:vagabond@cluster0.u5hrb.mongodb.net/Cluster0?retryWrites=true&w=majority", {useNewUrlParser:true});
// mongodb+srv://garry:<password>@cluster0.u5hrb.mongodb.net/<dbname>?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// passport config
app.use(require("express-session")({
	secret:"i am in love with backend programming!",
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

	// passing this object to every ejs file
	 app.use(function(req,res,next){
		 res.locals.currentUser =req.user;
		 res.locals.error     =req.flash("error");
		 res.locals.success     =req.flash("success");
		 
		 next();
	 });   
// use all routes
	  app.use("/",indexRoutes);
	  app.use("/campgrounds/:id/comments",commentRoutes);
	  app.use("/campgrounds",campgroundRoutes);
// definig  a port no.
// app.listen(6500,function(){
// 	console.log("its just the beginning! :)");
// });
app.listen(process.env.PORT,process.env.IP);