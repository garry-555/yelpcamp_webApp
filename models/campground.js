  
var mongoose=  require("mongoose");
var campgroundSchema= new mongoose.Schema({
	  name:String,
	  image:String,
	  description:String,
	  author:{
		  id: {
			    type: mongoose.Schema.Types.ObjectId,
			    ref:  "User"
			  },
		  username: String
       },
	  comments: [
		  {  // here we r associating datas wth object referencing
			  type: mongoose.Schema.Types.ObjectId,
			  ref:  "comment"
		  }
	  ]
	  
  });
module.exports=  mongoose.model("Campground",campgroundSchema);