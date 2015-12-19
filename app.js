// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var cookieSession = require('cookie-session');
//
// var routes = require('./routes/index');
// var users = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cookieSession({
//   name: 'session',
//   keys: [
//     process.env.SESSION_KEY1,
//     process.env.SESSION_KEY2,
//     process.env.SESSION_KEY3
//   ]
//
// }));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });



var disableButton = function(){
  $('.button').disabled=true;
}

$('#create-button').on('click', function() {
  var keyCode = eightDig();
  $('#create-button').text(keyCode);
    $(this).prop('disabled', true);
    $('#emailInput').show();
    $('#createChatSubmit').show();
  $('#create-button').css({'color':'#66CD00'});
  //$('#create-button').replaceWith("<p class='keyField'>" + keyCode + "</p>")
});

$('#join-button').on('click', function() {
  $(this).prop('disabled', true);
  $('#keyCodeInput').show();
  $('#joinChatSubmit').show();
});

var eightDig = function() {
  var code = [];
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < array.length - 2; i++) {
    code.push(random(array));

  }

  var keyCode = code.toString();
  keyCode = keyCode.replace(/,/g, '');
  console.log(keyCode);
  return keyCode;

}


var random = function(x) {
  var item = x[Math.floor(Math.random() * x.length)];
  // console.log(item);
  return item;
}

//
// module.exports = app;
