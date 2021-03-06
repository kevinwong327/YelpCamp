var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');

require('dotenv').config();

//requiring routes
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//require moment
app.locals.moment = require('moment');

app.use(flash());

// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(
	require('express-session')({
		secret: 'Once again I got the ticket to score',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add middleware to make currentUser available to every single route
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
	console.log('YelpCamp Server has Started');
});
