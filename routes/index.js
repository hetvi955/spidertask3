const express = require('express');
const router = express.Router();
const Product=require('../models/item');

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

module.exports = router;
