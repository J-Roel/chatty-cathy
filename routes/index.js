var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello' });
});

router.get('/chatroom', function(req, res, next) {
	res.render('chatroom', { title: 'Whiteboard' });
});


/*
router.post('/:number', function(req, res, next){
	var theURL = req.url;
	var chatroomNumber = req.params.number;
	//Or req.body.number to return a full object which is nicer
	//once you work with your database.
	var chatroomNumber = req.body.number;
	//In index.ejs you need to get set the form method to post,
	//then you set the name of the input field to "number"


});
*/
module.exports = router;
