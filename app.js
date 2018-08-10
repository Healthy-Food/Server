var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/key');
const passport = require('passport')
var logger = require('morgan');
var cors = require('cors')

var mongoose = require('mongoose')
var db = mongoose.connection

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
const authRoutes = require('./routes/auth');
var app = express();

mongoose.connect('mongodb://mario:mario123@ds113692.mlab.com:13692/healthy-food', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());
app.use(passport.session());
// set view engine

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/healthfood', indexRouter);
app.use('/users',userRouter)
app.use('/auth',authRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// e
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
