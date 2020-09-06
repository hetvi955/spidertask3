const express = require('express');
const router = express.Router();
const passport = require('passport');

  router.get('/register',isnotauth,(req,res)=>{
    var messages= req.flash('error');
    res.render('users/register', {messages:messages, errors: messages.length >0} );
  });
  router.post('/register',isnotauth,passport.authenticate('local.signup',{
    successRedirect: '/user/login',
    failureRedirect:'/user/register',
    //flash message in case of failure
    failureFlash:true
  }));
  router.get('/login',isnotauth,(req,res)=>{
    var messages= req.flash('error');
    res.render('users/login', {messages:messages, errors: messages.length >0} );
  });
  router.post('/login',isnotauth,passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect:'/user/login',
    //flash message in case of failure
    failureFlash:true
  }));
  
  router.get('/profile',isauth, (req,res)=>{
    res.render('users/profile');
  });

  router.get('./logout',(req,res)=>{
    res.logout();
    res.redirect('./');
  })

  module.exports= router;

  //allow acces to page only to logged in users(middleware)
  function isauth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
  };

  //only for users not loggedin
  function isnotauth(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
  }