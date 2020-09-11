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
 

  router.get('/register', (req,res)=>{
    var messages= req.flash('error');
    res.render('users/register', {messages:messages, errors: messages.length >0} );
  });
  router.post('/register',passport.authenticate('local.signup',{
    successRedirect: '/home',
    failureRedirect:'/user/register',
    //flash message in case of failure
    failureFlash:true
  }));

  router.get('/login',(req,res)=>{
    var messages= req.flash('error');
    res.render('users/login', {messages:messages, errors: messages.length >0} );
  });

  router.post('/login',passport.authenticate('local.signin',{
    successRedirect: '/home',
    failureRedirect:'/user/login',
    //flash message in case of failure
    failureFlash:true
  })
  );


  //allow acces to page only to logged in users(middleware)
    function isauth(req,res,next){
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect('/');
    };
    
 
  module.exports=isauth;
  module.exports= router;

