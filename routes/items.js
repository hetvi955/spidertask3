const express=require('express');
const router= express.Router();

var Item= require('../models/item');
var Category= require('../models/category');
var User= require('../models/user');

router.get('/', (req,res)=>{
    Item.find(function(err, items){
        if(err) return console.log(err);
        res.render('products', {title: 'Products', items:items, User:User});
    })  
});

router.get('/addcategory', (req,res)=>{
    res.render('categories_new');
    
});

router.post('/addcategory', (req,res)=>{
    var title=req.body.title;
    var description=req.body.description;
    Category.findOne({title:title, description:description}, function(err, category){
        if(category){
            req.flash('category already exists');
            res.render('categories',{
                title:title, 
                description:description
            });
        }
        var category= new Category({
            title:title,
            description:description
        });
        category.save(function(err){
            if (err) return console.log(err);
            res.redirect('/admin/categories');
        })
    })
});

router.get('/delete/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id, function(err){
        if(err){
            return console.log(err);
        }
        res.redirect('/admin/categories');
    });
});

router.get('/:category', (req,res)=>{
     
   var title_category= req.params.category;
    
    Category.findOne({title: title_category}, function(err, category){
        Item.find({category: title_category} ,function(err, items){
            if(err){
                return console.log(err);
            }
            res.render('categoryproducts', {title: Category.title, items:items});
        });
    });
});

router.get('/details/:title', (req,res)=>{
   
     Item.findOne({title: req.params.title}, function(err, item){
        if(err){
                 return console.log(err);
             }
             res.render('details', {title: item.title, description:item.description, price:item.price});
     });
 });


module.exports=router;