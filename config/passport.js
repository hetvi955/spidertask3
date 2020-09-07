const passport=require('passport');
const User=require('../models/user');
//passportlocal stratergy
const localStrategy=require('passport-local').Strategy;

//configure passport
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        done(err,user);
    })
});

passport.use('local.signup', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, (req,email,password,done)=>{
    User.findOne({'email':email}, (err,user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message:'user already exists'});
        }
        //if no err and no user, create new user using scheama
        var hashedpass=newUser.hashPassword(password);
        newUser.email= email;
        newUser.password=hashedpass;
        newUser.save((err, result)=>{
            if(err){
                return done(err);
            }
            return done(null, newUser)
        });
    }); var newUser= new User();
}));

//for login/signin
passport.use('local.signin', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({'email':email}, (err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message:'user not found :('});
        };
        if(!user.checkPassword(password)){
            return done(null, false, {message:'Invalid password'});
        }
        return done(null, user);
       
    });
}));