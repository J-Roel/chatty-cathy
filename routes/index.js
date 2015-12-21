var express = require('express');
var router = express.Router();
// var keyCode = require('../public/javascripts/homepage');

// console.log(keyCode.key());



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Whiteboard' });
});


router.post('/', function(req, res, next){
  var output = req.body.keyCode;
  console.log(keyCode);
  //var keyCode = document.getElementById('create-button').innerHTML();
  res.render('chatroom', {title: 'Welcome to chatroom #' + output});
  console.log(output);
});




module.exports = router;
