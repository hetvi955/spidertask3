const express=require('express');
const router= express.Router();
const mkdirp =require('mkdirp');
const fs =require('fs-extra');

var Item= require('../models/item');
var Category= require('../models/category');

router.get('/',isauth, (req,res)=>{
    Item.find(function(err, items){
        if(err) return console.log(err);
        res.render('items', {items: items});
    })
    
});
router.get('/additem', (req,res)=>{
    var title='';
    var description='';
    var price='';
    
    Category.find(function(err, category){
        res.render('additem', {
            title:title,
            description:description,
            price:price,
            category:category,
        });
        
    });
    
});
router.post('/additem', (req,res)=>{
    itemsarr=[];
    var title=req.body.title;
    var description=req.body.description;
    var price=req.body.price;
    var category=req.body.category;
    var imagefile= req.files.image.name;

    Item.findOne({title:title},function(err, items){
        if (err) return console.log(err);
        var item= new Item({
            title:title,
            description:description,
            category:category,
            price:price,
            image:imagefile
        });

        item.save(function(err) {
           if (err) return console.log(err);

          // mkdirp('public/images/' + item._id, function(err){
               //console.log(err);
           });
          // if(imagefile!=""){
               //var productimg=req.files.image;
               //var path='public/images/'+item._id+'/'+imagefile;
               //productimg.mv(path, function(err){
                //   console.log(err)
               //});
          // }
           res.redirect('/admin/items')
        });
      
    });
    router.get('/delete/:id', (req,res)=>{
        Item.findByIdAndRemove(req.params.id, function(err){
            if(err){
                return console.log(err);
            }
            res.redirect('/admin/items');
        });
    });
    
    function isauth(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
      };

module.exports = router ;