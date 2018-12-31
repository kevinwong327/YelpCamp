var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
{
	name: "Granite Hill", 
	image: "https://farm4.staticflickr.com/3464/3712326558_5a25585fe3.jpg",
	description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite"
}, function(err,campground){
	if(err){
		console.log(err);
	} else {
		console.log("NEWLY CREATED CAMPGROUND: ");
		console.log(campground);
	}
});
*/
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else {
		  res.render("index", {campgrounds: allCampgrounds});
	}
	});
});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create anew campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
		//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
	
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campgroud with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
	
})
app.listen(3000, process.env.IP, function(){
	console.log("YelpCamp Server has Started");
})