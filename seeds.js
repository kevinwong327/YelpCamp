var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
{
	name: "Cloud's Rest", 
	image: "https://external-preview.redd.it/okuSos6YC3uTC23bahiXW3FRcNTAWCm5F5a4BYeeM8s.jpg?auto=webp&s=253d7c814eec4d91fe96a0af4c16932588ed3b76",
	description: "It's hard to explain how amazing the backcountry is compared to the valley. It's so peaceful and serine."

},
{
	name: "Half Dome and Yosemite Valley", 
	image: "https://backpackersreview.files.wordpress.com/2017/07/imgp3725.jpg?w=740",
	description: "2 day/2 night camping and hiking trip in Yosemite National Park. Two hikes totaling ~20 miles and +/- 4,000 feet with a starting elevation of 8,100 feet and a peak elevation of 9,900 feet."

},
{
	name: "Vancouver Island", 
	image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
	description: "There are seven national parks in British Columbia, all offer Frontcountry Camping, Backcountry Camping, Huts and Cabins, and Winter Camping. Reservations can be made for camping in three of them: Gulf Islands National Park, Kootenay National Park, and Pacific Rim National Park."

}
]
function seedDB(){
	//Remove all campgrounds
	//remove() is replaced by deleteMany
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds

		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err)
				} else {
					console.log("add a campground");
					//create a comment
					Comment.create(
					{
						text: "As a backup, we decided we would just camp at one of the drive-in reservable campgrounds. Early in the morning on March 15th (the earliest date to reserve sites for a trip in late July) we logged onto the campsite reservation website and tried to reserve campsites in Tuolumne Meadows",
						author: "Homer Simpson"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);	
							campground.save();
							console.log("Created new comment");
						}
					});
				}
			});
		}); 
	});
	
}
module.exports = seedDB;