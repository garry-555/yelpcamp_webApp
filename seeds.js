var mongoose    =require("mongoose");
var Campground  =require("./models/campground");
var Comment     =require("./models/comment");

var data        =[
	  {
		  name: "Red Cherries",
		  image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		  description: "Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of            time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash               hunk.Flavor centerpiece plate, delicious ribs bone-in "
	  },
	  {
		  name: "Pineapples",
		  image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		  description: "Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in "
	  },
	  {
		  name: "More Pineapples",
		  image: "https://images.unsplash.com/photo-1517260911058-0fcfd733702f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		  description: "Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in "
	  }
]

function seedDB(){
	// remove all camprounds
	Campground.remove({},function(err){
		if(err) {
		console.log(err);
		}
		console.log("removed camgrounds!");
				// add few campground
			data.forEach(function(seed){
				 Campground.create(seed,function(err,campground){
					   if(err){
						   console.log(err);
					   }
					 else{
						 console.log("added a Campground!!!");
						 	// add few comments
						   Comment.create({
							     text: "this fruit is well known 4 its health benefits! thrfre musthv in meals!!!....",
							     author:"Garry"
						   },function(err,comment){
							     if(err){
									 console.log(err);
								  }
							   else{
									   campground.comments.push(comment);
									   campground.save(); 
									   console.log("created new commment");
							      }
							     
						   });
						 
					 }
				 });
			})
     });
	
	
	

} 
module.exports= seedDB;
