var express = require('express');
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

router.post('/', function(req, res, next) {
  console.log(req.body);
  var roomCode = req.body.roomCode;
  console.log('hi');


  console.log('hello');
  
  chatRoom().insert({
    key_code: roomCode
  }).then(function(key) {

    //Return our values and update elements
    res.render('chatroom', {
      title: 'Chatty Cathy',
      roomCode: roomCode
    }); //this is the callback function that gets called when we successfully insert a monkey
    console.log('success');
  }).catch(function(err) { //this is the callback function that gets called when we fail
    console.log(err.toString());
  });




});

function sendMail(emails) {
  //Mail them
  var email = new sendgrid.Email();
  email.addTo("test@sendgrid.com");
  email.setFrom("jeremyroelfs@icloud.com");
  email.setSubject("Sending with SendGrid is Fun");
  email.setHtml("and easy to do anywhere, even with Node.js");

  sendgrid.send(email);
}

module.exports = router;
