// // campgrounds route

var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// index route
router.get("/",function(req,res){
	
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
});
// create route
router.post("/",middleware.isLoggedIn,function(req,res){  // 
	// 
	//res.send("just post it my postman!");
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,image:image,description:desc,author:author};
	//console.log(req.user);
	//campgrounds.push(newCampground);
	// create a new campground and save to the db
	Campground.create(newCampground,function(err,newlyCreated){
					  if(err){
     // get all the campground from the db
	
						  console.log(err);
					  }else{
						  res.redirect("/campgrounds");  // redirect back to campground
					  }
		 });
	//res.redirect("/campgrounds");
});
// add new campground route
router.get("/new",middleware.isLoggedIn,function(req,res){   // ,
				res.render("campgrounds/new");
			});
// show route//SHOW MORE INFO ABOUT ANY ONE PARTICULAR CAMPGROUND!
router.get("/:id",function(req,res){
	// find the campground with the provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			// render show template wth tht campground
			console.log(foundCampground);
			
         // SHOW MORE INFO ABOUT ANY ONE PARTICULAR CAMPGROUND!
	        res.render("campgrounds/show",{campground: foundCampground});
		}
	});

	
});
// EDIT CAMPGROUND ROUTE 
router.get("/:id/edit",middleware.isValidAuthor_camp,function(req,res){ //
	// check if user is logged in (if user.id==author.id thn only he can edit otherwise he cant edit) else cnt visit edit page

		Campground.findById(req.params.id,function(err,foundCampground){
		  if(err){
				console.log(err);
				res.redirect("/campgrounds");
		   }else{
// 			    check whether user is same as author
			   
				   res.render("campgrounds/edit",{campground:foundCampground});
			
			   
				
			}
		});
	
});

// UPDATE CAMPGROUND ROUTE 
router.put("/:id",middleware.isValidAuthor_camp,function(req,res){   //
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
	// & redirect somewhere(show page)
	
	
	
});

 // DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.isValidAuthor_camp,function(req,res){  //
	  Campground.findByIdAndRemove(req.params.id,function(err){
		    if(err){
				console.log(err);
			}else{
				res.redirect("/campgrounds");
			}
		  
	  });
	
}); 



// defining a middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// // a middleware which ensures of authorisation
// function isValidAuthor(req,res,next){
// 	  if(req.isAuthenticated()){
// 		  Campground.findById(req.params.id,function(err,foundCampground){
// 		  if(err){
// 				console.log(err);
// 				res.redirect("/campgrounds");
// 		   }else{
// // 			    check whether user is same as author
// 			   if(foundCampground.author.id.equals(req.user._id)){
// 				    next();
// 			   }
// 			   else{
// 				    res.redirect("back");
// 			   }
			   
				
// 			}
// 		});
		
// 	}
// 	else{
// 		  // noone is logged in
// 		  res.redirect("back");
// 	}
	
// }

// use it 


module.exports=router;