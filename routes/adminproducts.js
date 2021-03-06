const express=require('express');
const router= express.Router();
const multer=require('multer');

var Item= require('../models/item');
var Category= require('../models/category');

//set storage for uploads
const storage= multer.diskStorage({
    destination:'../public/uploadimages/',
    filename: function(req, file, cb){
      cb(null, file.fieldname + '.' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload=multer({
    storage:storage,
  });
  

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
    var quantity=';'
    
    Category.find(function(err, category){
        res.render('additem', {
            title:title,
            description:description,
            price:price,
            category:category,
            quantity:quantity
        });
        
    });
    
});
router.post('/additem',  (req,res)=>{
    var title=req.body.title;
    var description=req.body.description;
    var price=req.body.price;
    var category=req.body.category;
    var quantity=req.body.quantity;

    Item.findOne({title:title},function(err, items){
        if (err) return console.log(err);
        var item= new Item({
            title:title,
            description:description,
            category:category,
            price:price,
            quantity:quantity,
           
        });

        item.save(function(err) {
           if (err) return console.log(err);
           });
            console.log(req.file, req.body)
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