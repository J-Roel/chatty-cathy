var express = require('express');
var router = express.Router();

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

	//get key code passed from index
	var roomCode = req.body.roomCode;
	var doMakeRoom = false;
	//Get database info
	knex('chatrooms').select('key_code')
	.then(function(data){
		console.log(data);
		for(var i = 0; i < data.length; i++){//goes through array
			for(var key in data[i]){//goes through object
				if( roomCode !== data[i][key] )//if not the same roomCode
				{
					doMakeRoom = true;
					console.log("Making a new room");
				} else {
					doMakeRoom = false;
					console.log("Found a room with the same number.");
					//Generate a new number
					roomCode = eightDig();
				}
			}
		}

		if(doMakeRoom)
		{
			//We have a valid room so add to database
			// knex('table').insert({a: 'b'}).returning('*').toString();
			// "insert into "table" ("a") values ('b')"
			console.log('inserting into chatrooms');
			knex('chatrooms').insert({
				key_code: roomCode
			}).returning(key);

			//parse and send emails if we have a valid room

			//SETUP OUR ROOM
			res.render('chatroom', {
				title: 'Chatty Cathy',
				roomCode: roomCode,
				rooms: data
			});
		} else {
			res.render('index', {
				title: 'Chatty Cathy',
				codeErr: 'Room is not available. Redirecting to another room.',
				roomCode: roomCode,
				rooms: data
			})

		}
	});//END router.post('/')

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


//KEYCODE
var eightDig = function() {
  var code = [];
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < array.length - 2; i++) {
    code.push(random(array));

  }
  var keyCode = code.toString();
  keyCode = keyCode.replace(/,/g, '');
  return keyCode;
}


var random = function(x) {
  var item = x[Math.floor(Math.random() * x.length)];
  return item;
}


module.exports = router;
