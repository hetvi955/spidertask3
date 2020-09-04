const mongoose =require('mongoose');
const Schema= mongoose.Schema;

const itemschema= new Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },    
});

module.exports= mongoose.model('items',itemschema);

