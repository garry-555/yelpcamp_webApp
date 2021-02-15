// COMMENTS ROUTES
var express    = require("express");
var router     = express.Router({mergeParams:true});// to fix id issue in route in app.js // shorten the comment route
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");
// ===============comment routes=================  //

//adding new comment
router.get("/new",middleware.isLoggedIn,function(req,res){  //
	 Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
		      console.log(err);
	     }
	  else{
		  res.render("comments/new",{campground: foundCampground});
	  }
	
						  
	 });
	
});
// comments create
router.post("/",middleware.isLoggedIn,function(req,res){  //
	// look 4 ampgrnd using id
	Campground.findById(req.params.id,function(err,campground){
		  if(err){
			  console.log(err);
			  res.redirect("/campgrounds");
		  }
		else{
			Comment.create(req.body.comment,function(err,comment){
				 if(err) {
					 console.log(err);
				 }
				else{
					//add username & id to the comment
					//console.log("new comments username ll be "+req.user.username);
					comment.author.id      =req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully uploaded Your Comment");
					res.redirect("/campgrounds/"+campground._id);
					
				}
			});
		}
	});
});
// edit comment --
router.get("/:comment_id/edit",middleware.isValidAuthor_comment,function(req,res){ //
	 
	  Comment.findById(req.params.comment_id,function(err,foundComment){
	  if(err){
		  console.log(err);
		  res.redirect("back");
	  }
	  else{
	      res.render("comments/edit",{campground_id:req.params.id , comment:foundComment});
	  }
	  });
});

// update ur comment
 router.put("/:comment_id",middleware.isValidAuthor_comment,function(req,res){ //
	   // res.send("u hit the update butoon");
	   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,newComment){
		     if(err){
				   console.log(err);
				   res.redirect("back");
			 }else{
				  res.redirect("/campgrounds/"+req.params.id);
			 }
		      
	   });
 });
//  delete router
router.delete("/:comment_id",middleware.isValidAuthor_comment,function(req,res){ //
	   // res.send(" u hit the del button");
	   Comment.findByIdAndRemove(req.params.comment_id,function(err){
		   if(err){
			   console.log(err);
			   res.redirect("back");
		   }else{
			   console.log("/campgrounds/"+req.params.id);
			   req.flash("success","Successfully Deleted");
		   		res.redirect("/campgrounds/"+req.params.id);
		   }
		      
	   });
});

// defining a middleware to authorise comment section
// function isValidAuthor(req,res,next){
// 	if(req.isAuthenticated()){
// 		// check user_id == comment.user.user_id
// 		 Comment.findById(req.params.comment_id,function(err,foundComment){
// 			   if(err){
// 				   console.log(err);
// 				    res.redirect("back");
// 			   }else{
// 				   if(foundComment.author.id.equals(req.user._id)){
// 					     next();
					  
// 					  }
// 					  else{
// 					     res.redirect("back");
// 					  }
// 			   }
// 		 });
// 	}else{
// 		res.redirect("back");
// 	}
	
// }


// defining a middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
module.exports=router;
