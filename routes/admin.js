const express=require('express');
const router= express.Router();

router.get('/',isauth, (req,res)=>{
    res.render('users/admin', {title:'admin_page'});
    });

    function isauth(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
      };

module.exports=router;