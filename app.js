var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   req.happyMessage = "happy!";
//   next();
// })

// ROUTING
var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var usersRouter = require('./routes/users');
var lookupRouter = require('./routes/lookup');
var mysqlRouter = require('./public/examples/mysql/router');
var lab9Router = require('./public/labs/9/router');

// For exercises
//var routingExerciseRouter = require('./routes/exercises/routing');
//var exerciseRouter = require('./routes/exercises/index');

app.use('/', indexRouter);
app.use('/mysql', mysqlRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/lookup', lookupRouter);
// For exercises
//app.use('/exercises/routing', routingExerciseRouter);
//app.use('/exercises', exerciseRouter);
// For labs
app.use('/lab/9', lab9Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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