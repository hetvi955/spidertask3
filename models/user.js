const mongoose=require('mongoose');
const schema=mongoose.Schema;

//to hash passwords
const bcrypt = require('bcrypt-nodejs');

const userSchema= new schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_buyer:{
        type:Boolean,
        default:true
    },
});

//hash [password using bcrypt]
userSchema.methods.hashPassword= function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};
userSchema.methods.checkPassword= function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports= mongoose.model('User',userSchema);