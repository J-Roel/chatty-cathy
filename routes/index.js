var express = require('express');
var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);
var router = express.Router();

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1', //localhost server
    port: 5432, //default pg server port
    user: 'zachbuchenau', //your username
    database: 'chattycathy' //yourdatabase name
  }
});
//**************************************************************************************



//Define a function to get our table
var chatRoom = function() {
  return knex('chatrooms');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to Chatty Cathy'
  });
  console.log('query');

});


router.post('/', function(req, res, next) {
  console.log(req.body);
  var roomCode = req.body.roomCode;
  var email = req.body.email;
  console.log(email);

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

// var sendEmail = sendgrid.send(process.env.PAYLOAD, function(err, json) {
//   if (err) { console.error(err); }
//   console.log('hello');
// });

module.exports = router;
