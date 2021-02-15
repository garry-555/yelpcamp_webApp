var Campground  =require("../models/campground.js");
var Comment     =require("../models/comment.js");
var express    = require("express");

var middlewareObj={};

middlewareObj.isValidAuthor_camp=function (req,res,next){
	  if(req.isAuthenticated()){
		  Campground.findById(req.params.id,function(err,foundCampground){
		  if(err){
				console.log(err);
			    req.flash("error","Caampground Not Found");
				res.redirect("/campgrounds");
		   }else{
// 			    check whether user is same as author
			   if(foundCampground.author.id.equals(req.user._id)){
				    next();
			   }
			   else{
				   req.flash("error","You Dont Have Permission To Do That");
				    res.redirect("back");
			   }
			   
				
			}
		});
		
	}
	else{
		  // noone is logged in
		req.flash("error","You Need To Be Logged In To Do That");
		  res.redirect("back");
	}
	
}

middlewareObj.isValidAuthor_comment=function(req,res,next){
	if(req.isAuthenticated()){
		// check user_id == comment.user.user_id
		 Comment.findById(req.params.comment_id,function(err,foundComment){
			   if(err){
				   console.log(err);
				    res.redirect("back");
			   }else{
				   if(foundComment.author.id.equals(req.user._id)){
					     next();
					  
					  }
					  else{
						  req.flash("error","You Dont Have Permission To Do That");
					     res.redirect("back");
					  }
			   }
		 });
	}else{
		req.flash("error","You Need To Be Logged In To Do That");
		res.redirect("back");
	}
	
}

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You Need To Be Logged In first!");
	res.redirect("/login");
}


module.exports=middlewareObj