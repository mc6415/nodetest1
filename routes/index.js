var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello World' });
});

router.get('/helloworld', function(req,res){
	res.render('helloworld', {title: 'Hello, World!'})
});

router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist": docs
		});
	});
});

router.get('/newuser', function(req,res){
	res.render('newuser', {title: 'Add New User:'});
});

router.post('/adduser', function(req,res){
	//Set internal DB Variable
	var db = req.db;

	//Get form values. These rely on the 'name' attribute
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Set the collection in Mongo
	var collection = db.get('usercollection');

	//Submit to the DB
	collection.insert({
		"username": userName,
		"email": userEmail
	}, function(err,doc){
		if(err){
			res.send("There was a problem with the request");
		} else {
			//If it worked set the header so the address bar doesn't still say 
			// /adduser
			res.location("userlist");
			// And forwarc to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
