const express=require('express');
const router= express.Router();

var Category= require('../models/category');

router.get('/',isauth, (req,res)=>{
    Category.find(function(err, categories){
        if(err) return console.log(err);
        res.render('categories', {categories: categories});
    })
    
});
router.get('/addcategory', (req,res)=>{
    res.render('categories_new')
    
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

function isauth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
  };
module.exports=router;