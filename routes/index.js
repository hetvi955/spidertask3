const express = require('express');
const router = express.Router();
const passport = require('passport');
const Item=require('../models/item');
const cart = require('../models/cartitems'); 
const order = require('../models/orders');
const history = require('../models/history'); 



//render products array
router.get('/home', isauth,function(req, res, next) {
    Item.find((error,docs)=>{
    //to display in rows of 3
    var productarr=[];
    for(var i=0; i<docs.length; i+=3){
      productarr.push(docs.slice(i,i+3));
    }
    res.render('home', { title: 'shopping' , products:productarr});
  }); 
});

router.get('/', (req,res)=>{
  res.render('users/login')
});

router.get('/addnew/:id',isauth, (req,res)=>{
  var productId= req.params.id;
  var newcart= new cart(req.session.newcart ? req.session.newcart:{
    //new cart object
  });
 Item.findById(productId, (err, product)=>{
    if(err){
      return res.redirect('/home');
    }
    newcart.add(product, product.id);
    req.session.newcart= newcart;
    console.log(req.session.newcart);
    res.redirect('/cart');
    
  });
});

router.get('/cart',isauth, (req,res)=>{
  if(!req.session.newcart){
    return res.render('cart', {products:null});
  }
  var Cart = new cart(req.session.newcart);
  res.render('cart', {products:Cart.addarr(), totalmoney:Cart.totalmoney})
});

router.get('/clearcart', (req,res)=>{
  delete req.session.newcart;
  res.redirect('/cart')
});

router.get('/order/:id',isauth, (req,res)=>{
  var productId= req.params.id;
  var neworder= new order(req.session.neworder ? req.session.neworder:{
    //new object
  });
 Item.findById(productId, (err, product)=>{
    if(err){
      return res.redirect('/home');
    }
    neworder.add(product, product.id);
    req.session.neworder= neworder;
    console.log(req.session.neworder);
    res.redirect('/orders');
    
  });
});

router.get('/orders',isauth, (req,res)=>{
  if(!req.session.neworder){
    return res.render('order', {products:null});
  }
  var Order = new order(req.session.neworder);
  res.render('order', {products:Order.addarr(), totalmoney:Order.totalmoney})
});

router.get('/history',isauth, (req,res)=>{
  if(!req.session.neworder){
    return res.render('history', {products:null});
  }
  var Order = new order(req.session.neworder);
  res.render('history', {products:Order.addarr(), totalmoney:Order.totalmoney})
});

router.get('/clearorders', (req,res)=>{
  delete req.session.neworder;
  res.redirect('/orders')
});

function isauth(req,res,next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
};

router.get('/role',(req,res)=>{
  var messages= req.flash('error');
  res.render('users/role', {messages:messages, errors: messages.length >0} );
});

router.post('/role',(req,res)=>{
  console.log(req.body.role);
  if(req.body.role==='seller'){
    res.redirect('/admin')
  }else if (req.body.role==='customer'){
    res.redirect('/home')
  }
});

module.exports = router;
