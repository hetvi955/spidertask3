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
    image:{
        type:String,
    
    }, 
    category:{
        type:String,
        
    },    
});

module.exports= mongoose.model('items',itemschema);

