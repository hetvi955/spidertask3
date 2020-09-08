const express = require('express');
const router = express.Router();
const passport = require('passport');
const isauth= require('../routes/user');
const Product=require('../models/item');
const cart = require('../models/cartitems'); 
const isnotauth = require('../routes/user');

//render products array
router.get('/home', isauth,function(req, res, next) {
  Product.find((error,docs)=>{
    //to display in rows of 3
    var productarr=[];
    for(var i=0; i<docs.length; i+=3){
      productarr.push(docs.slice(i,i+3));
    }
    res.render('home', { title: 'shopping' , products:productarr});
  }); 
});

router.get('/',isnotauth, (req,res)=>{
  res.render('users/login')
});

router.get('/addnew/:id',isauth, (req,res)=>{
  var productId= req.params.id;
  var newcart= new cart(req.session.newcart ? req.session.newcart:{
    //new cart object
  });
  Product.findById(productId, (err, product)=>{
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


module.exports = router;
