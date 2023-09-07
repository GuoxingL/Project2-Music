var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override')

require('dotenv').config();

require('./config/database');

require('./config/passport');

const indexRouter = require('./routes/index');
const musicsRouter = require('./routes/musics');
const reviewsRouter = require('./routes/reviews');
const locationsRouter = require('./routes/locations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));



app.get('/musics/new', (req, res) => {
  const title = 'New Music'; // Set the title variable as needed
  const user = req.user; 
  console.log('Title:', title);
  console.log('User:', user);
  res.render('musics/new', { title, user });
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// app.get('/', (req, res) => {
 
//   res.render('home', { title: 'Home Page' }); 
// });

app.use(passport.initialize());
app.use(passport.session());



// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/musics', musicsRouter);

app.use('/', reviewsRouter);
app.use('/',locationsRouter);


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
