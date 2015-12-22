var express = require('express');
<<<<<<< HEAD
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
=======
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1', //localhost server
    port: 5432, //default pg server port
    user: 'zachbuchenau', //your username
    database: 'chattycathy' //yourdatabase name
  }
});

var router = express.Router();
>>>>>>> 579b972b8b3ae8bcfd8a27a74cb8fb55a9b110ee

//Define a function to get our table
var chatRoom = function() {
  return knex('chatrooms');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to Chatty Cathy'
  });
  console.log(query);
});

router.get('/chatroom', function(req, res, next) {
  res.render('chatroom', {
    title: 'Welcome to Chatty Cathy'
  });
});

<<<<<<< HEAD
=======
router.post('/', function(req, res, next) {
  console.log(req.body);
  var roomCode = req.body.roomCode;
  console.log('hi');


  console.log('hello');
  
  chatRoom().insert({
    key_code: roomCode
  }).then(function(key) {
>>>>>>> 579b972b8b3ae8bcfd8a27a74cb8fb55a9b110ee

    //Return our values and update elements
    res.render('chatroom', {
      title: 'Chatty Cathy',
      roomCode: roomCode
    }); //this is the callback function that gets called when we successfully insert a monkey
    console.log('success');
  }).catch(function(err) { //this is the callback function that gets called when we fail
    console.log(err.toString());
  });

<<<<<<< HEAD
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
				if( roomCode !== data[i][key] )
				{
					doMakeRoom = true;				
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
=======
>>>>>>> 579b972b8b3ae8bcfd8a27a74cb8fb55a9b110ee



});

<<<<<<< HEAD
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
=======
function sendMail(emails) {
  //Mail them
  var email = new sendgrid.Email();
  email.addTo("test@sendgrid.com");
  email.setFrom("jeremyroelfs@icloud.com");
  email.setSubject("Sending with SendGrid is Fun");
  email.setHtml("and easy to do anywhere, even with Node.js");
>>>>>>> 579b972b8b3ae8bcfd8a27a74cb8fb55a9b110ee

  sendgrid.send(email);
}

module.exports = router;
