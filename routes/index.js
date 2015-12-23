var express = require('express');

var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);

var router = express.Router();

var knex = require('knex')({

	client: 'pg',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		user: process.env.DB_USER,
		password: '',
		database: 'chattycathy'
	}
});



//Define a function to get our table
var chatRoom = function() {
  return knex('chatrooms');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to Chatty Cathy'
  });
});


router.post('/', function(req, res, next) {
  console.log(req.body);
  var roomCode = req.body.roomCode;
  var email = req.body.email;
  console.log(email);


	var doMakeRoom = false;
	//Get database info\q
	
	chatRoom().select('key_code')
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

			if(email != "")
		    {
		      sendgrid.send({
		        to: email,
		        from: 'zbuchenau@gmail.com',
		        subject: 'Key Code For Chatty Cathy Chatroom!',
		        text: 'your key code for your chatroom is ' + roomCode
		      }, function(err, json){
		        if (err){
		          console.log(err);
		        }console.log(json);
		      });

		      sendgrid.send({
		        to: email,
		        from: 'noreply@tightbutthole.com',
		        subject: 'Key Code For Chatty Cathy Chatroom!',
		        text: 'your key code for your chatroom is ' + roomCode
		      }, function(err, json){
		        if (err){
		          console.log(err);
		        }console.log(json);
		      });
			}

			//We have a valid room so add to database
			// knex('table').insert({a: 'b'}).returning('*').toString();
			// "insert into "table" ("a") values ('b')"
			console.log('inserting into chatrooms');
			chatRoom().insert({
				key_code: roomCode
			}).then(function(key){
				//Do nothing
      		});

			//parse and send emails if we have a valid room

			//SETUP OUR ROOM
			res.render('chatroom', {
				title: 'Chatty Cathy',
				roomCode: roomCode
			});
		} else {
			res.render('index', {
				title: 'Chatty Cathy'
			});

		}//END IF
	});//END POSTGRES

});//END router.post('/')



//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX - JR
router.post('/join', function(req, res, next) {
	console.log('Joining room', req.body.keyCodeInput);
	var roomCode = req.body.keyCodeInput;

  	var gotoRoom = false; //Use to make sure we have a room

  	//POSTGRESQL COMPARE WITH KEY_CODE
  	chatRoom().select('key_code')
	.then(function(data){
		for(var i = 0; i < data.length; i++){//goes through array
			for(var key in data[i]){//goes through object
				if( roomCode === data[i][key] )//if the same as roomCode
				{
					gotoRoom = true;//set goto room to true
					console.log("Adding you to a room.", gotoRoom, roomCode);
				} else {
				//	console.log('No room of that number found.');
				}
			}
		}
	

		if(gotoRoom)
		{
			console.log('Goto chatroom', roomCode);
			res.render('chatroom', {
				roomCode: roomCode,
				title: 'Chatty Cathy'
			});
		} else {
			res.render('index', {
				title: 'Chatty Cathy',
				msg: 'No Room of That Number Found.'
			});
		}

	});//END POSTGRES


});//END router.post('/join')
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx - END

function sendMail(emails){
		//Mail them
		var email = new sendgrid.Email();
		email.addTo("test@sendgrid.com");
		email.setFrom("jeremyroelfs@icloud.com");
		email.setSubject("Sending with SendGrid is Fun");
		email.setHtml("and easy to do anywhere, even with Node.js");

		sendgrid.send(email);
}


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
};


var random = function(x) {
  var item = x[Math.floor(Math.random() * x.length)];
  return item;
};


module.exports = router;
