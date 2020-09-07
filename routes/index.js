const express = require('express');
const router = express.Router();
const Product=require('../models/item');
const cart = require('../models/cartitems'); 

//render products array
router.get('/', function(req, res, next) {
  Product.find((error,docs)=>{
    //to display in rows of 3
    var productarr=[];
    for(var i=0; i<docs.length; i+=3){
      productarr.push(docs.slice(i,i+3));
    }
    res.render('dashboard', { title: 'shopping' , products:productarr});
  }); 
});

router.get('/addnew/:id', (req,res)=>{
  var productId= req.params.id;
  var newcart= new cart(req.session.newcart ? req.session.newcart:{
    //new cart object
  });
  Product.findById(productId, (err, product)=>{
    if(err){
      return res.redirect('/');
    }
    newcart.add(product, product.id);
    req.session.newcart= newcart;
    console.log(req.session.newcart);
    res.redirect('/');
    
  });
});

router.get('/cart', (req,res)=>{
  if(!req.session.newcart){
    return res.render('/cart', {products:null});
  }
  var Cart = new cart(req.session.Cart);
  res.render('/cart', {products:Cart.addarr(), totalmoney:Cart.totalmoney})
});

module.exports = router;
