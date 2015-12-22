var express = require('express');
var router = express.Router();

// var knex = require('knex')({});
// var pg = require('knex')({client: 'pg'});

var knex = require('knex')({
	
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: 'jroel',
		password: '',
		database: 'chattycathy'
	}
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Chatty Cathy' });
});

router.get('/chatroom', function(req, res, next){
	res.render('chatroom', { title: 'Welcome to Chatty Cathy' });
});

router.post('/', function(req, res, next) {
	console.log(req.body);

	//get key code passed from index
	var roomCode = req.body.roomCode;
	var doMakeRoom = false;
	//Get database info
	knex('chatrooms').select('key_code')
	.then(function(data){
		console.log(data);
		for(var i = 0; i < data.length; i++){//goes through array
			for(var key in data[i]){//goes through object
				if( roomCode !== data[i][key] )
				{
					doMakeRoom = true; 					
				} else {
					doMakeRoom = false;
					console.log("Found a room with the same number");
				}

			}
		}
		
		if(doMakeRoom)
		{

			//SETUP OUR ROOM
			res.render('chatroom', {
				title: 'Chatty Cathy',
				roomCode: roomCode,
				rooms: data 
			});
		} else {

		}



		
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
};




module.exports = router;
