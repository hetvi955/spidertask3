const mongoose =require('mongoose');
const Schema= mongoose.Schema;

const itemschema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }, 
    quantity:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        
    },    
});

module.exports= mongoose.model('items',itemschema);

