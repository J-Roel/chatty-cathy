var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSION_KEY1,
    process.env.SESSION_KEY2,
    process.env.SESSION_KEY3
  ]

}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//------------------------------------------------------------------------------

//Connect to postgres via knex
//You need to install and save knex and pg to your project
//replace the appropriate variables such as user and db name
var knex = require('knex')({
  client: 'pg', //we will be using pg to connect to postgres
  connection: {
    host: '127.0.0.1', //localhost server
    port: 5432, //default pg server port
    user: 'zachbuchenau', //your username
    database: 'chattycathy' //yourdatabase name
  }
});

//Define a function to get our table
var chatRoom = function(){
   return  knex('chatrooms');
};

//insert a monkey into our table
chatRoom().insert({
  key_code: '******',//TODO
}).then(function(key) { //this is the callback function that gets called when we successfully insert a monkey
  console.log(key);
}).catch(function(err) { //this is the callback function that gets called when we fail
  console.error(err);
});

//select a monkey from our table
//this will retrieve all puppies who have email equal to curiousgeorge
chatRoom().where({
  key_code: '******'//TODO
}).then(function(monkey) {//this is the callback function that gets called when we successfully retrieve monkeys
  //monkey is an array of all selected monkeys.
  console.log(monkey);
}).catch(function(err){
  console.error(err);
});

module.exports = app;
