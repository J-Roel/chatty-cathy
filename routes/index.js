var express = require('express');
var router = express.Router();
var keyCode = require('../javascripts/homepage.js');

console.log(keyCode.key());



// var sendgrid = require("sendgrid")(api_user, api_key);




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Chatty Cathy' });
});

router.get('/chatroom', function(req, res, next){
	res.render('chatroom', { title: 'Welcome to Chatty Cathy' });
});

router.post('/', function(req, res, next){
  var output = req.body.keyCode;
  console.log(keyCode);
  //var keyCode = document.getElementById('create-button').innerHTML();
  res.render('chatroom', {title: 'Welcome to chatroom #' + output});
  console.log(output);
});

router.get('/create', function(req, res, next) {
	console.log(req.query);
	var roomCode = req.query.roomCode;
	//Email addresses
		//Get email address

	//send email
		// sendMail(emails);



	//Return our values and update elements
	res.render('chatroom', {
		title: 'Chatty Cathy',
		roomCode: roomCode

	});
});

function sendMail(emails){
		//Mail them
		var email = new sendgrid.Email();
		email.addTo("test@sendgrid.com");
		email.setFrom("jeremyroelfs@icloud.com");
		email.setSubject("Sending with SendGrid is Fun");
		email.setHtml("and easy to do anywhere, even with Node.js");

		sendgrid.send(email);
}

module.exports = router;
