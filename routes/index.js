// AUTH ROUTES - INDEX ROUTES 

var express    = require("express");
var router     = express.Router();
var passport   =require("passport");
var User      = require("../models/user");
// initial route i.e. landing route//root route
router.get("/",function(req,res){
	//res.send("its me!");
	res.render("landing");
});



//====== auth routes =======//
 // show register form
router.get("/register",function(req,res){
	res.render("register");
});
 // handle signup logic
router.post("/register",function(req,res){
	var newUser =new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			  req.flash("success","Welcome To Yelpcamp "+user.username);
			  res.redirect("/campgrounds");
		});
		
	});
});
  // show login form
 router.get("/login",function(req,res){
	 
	  res.render("login");
  });
  // handling login logic
  // app.post("/login",middleware,callback)
router.post("/login",passport.authenticate("local",{   // middleware
	  successRedirect: "/campgrounds",    
	  failureRedirect: "/login"
  }),
		   function(req,res){
	  
  });
// logout route
router.get("/logout",function(req,res){
	  req.logout();
	  req.flash("success","logged u out");
	  res.redirect("/campgrounds");
  });
// defining a middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;
