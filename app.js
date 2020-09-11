var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var logger = require('morgan');
const hbs= require('express-handlebars');
const dotenv= require('dotenv');
const connectdb=require('./config/db');
const mongoose= require('mongoose');
const session=require('express-session');
const fileUpload=require('express-fileupload');
const mongostore=require('connect-mongo')(session);
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//authentication
const passport=require('passport');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var adminitems = require('./routes/adminproducts');
var admincategories = require('./routes/admincategory');
var items= require('./routes/items');
//for displaying error messages
const flash=require('connect-flash');
const { Script } = require('vm');

const app = express();

dotenv.config({
  path:'./config/config.env'
});
connectdb();

//require passport localstartegy
require('./config/passport');

// view engine
//to set up .hbs as handlebars extension
app.engine('.hbs',hbs({defaultLayout:'layout', extname:'.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');

//file upload
app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'ihateoffee', resave:false, saveUninitialized:false,
 store: new mongostore({
 mongooseConnection:mongoose.connection,
 })}));

app.use(flash());
app.use(passport.initialize());

//ask passport to use session
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//to makelogin availaible in all pages in navbar
app.use((req,res,next)=>{
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

var Category= require('./models/category');
Category.find(function(err, category){
  if(err) console.log(err);
  app.locals.category=category;
});


app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/admin/items', adminitems);
app.use('/admin/categories', admincategories);
app.use('/items', items);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 // console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

//lsten app
app.listen(3000,()=>{
  console.log('server up on 3000')  
});

