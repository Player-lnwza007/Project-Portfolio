var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* var flash = require('express-flash'); */
var session = require('express-session');
var database = require('mysql');

var indexRouter = require('./routes/index.js');
var adminRouter = require('./routes/admin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))
/* app.use(flash());*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));


app.use('/', indexRouter,adminRouter);
app.use('/api', indexRouter,adminRouter); 
app.use('/admin', adminRouter);
app.use('/api', indexRouter);
app.use('/api/admin', adminRouter);

app.get('/', function (req, res) {
  res.render("index");
});
app.get('/admin', function (req, res) {
  res.render("admin/admin_index");
});

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
app.listen(4000, () => console.log('Server is running on port 4000'));
module.exports = app;
