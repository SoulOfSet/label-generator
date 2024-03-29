//Modules used throughout the project
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var CONFIG = require('./config.js');
var mongoose = require('mongoose');

//Route files
var index = require('./routes/index.route');
var items = require('./routes/items.route');

require('./models/items.model');


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
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Use the routes for specific path. (Ex. "app.use('/users', users)" will take all routes defined and use them as
 * www.website.com/users/
 */
app.use('/', index);
app.use('/items', items);

// mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://' + CONFIG.DB_ADDR + '/' + CONFIG.DB_NAME);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
