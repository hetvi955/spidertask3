const express = require('express');
const router = express.Router();
const passport = require('passport');
const User=require('../models/user');

router.get('/logout',isauth,(req,res)=>{
  req.logout();
  res.redirect('/');
  });

  router.get('/profile',isauth, (req,res)=>{
    res.render('users/profile', {name:req.body.email});
  });
  router.get('/seller',isauth,(req,res)=>{
    res.render('users/seller' );
  });

  router.get('/register',isnotauth,(req,res)=>{
    var messages= req.flash('error');
    res.render('users/register', {messages:messages, errors: messages.length >0} );
  });
  router.post('/register',isnotauth,categorybuyer,passport.authenticate('local.signup',{
    successRedirect: '/home',
    failureRedirect:'/user/register',
    //flash message in case of failure
    failureFlash:true
  }));
  router.get('/login',isnotauth,(req,res)=>{
    var messages= req.flash('error');
    res.render('users/login', {messages:messages, errors: messages.length >0} );
  });
  router.post('/login',isnotauth,categorybuyer,passport.authenticate('local.signin',{
    successRedirect: '/home',
    failureRedirect:'/user/login',
    //flash message in case of failure
    failureFlash:true
  }));

  function categorybuyer(req,res,next){
    if(!req.category=='customer'){
      res.redirect('/seller');
      console.log(req.category);
      return next();
    }
  };

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
  

  module.exports=isnotauth;
  module.exports=isauth;
  module.exports= router;

