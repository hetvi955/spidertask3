const mongoose=require('mongoose');
const Product =require('../models/item');

const connectdb= async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true

    });
    
    console.log(`connected to: ${conn.connection.host}`)
};

module.exports=connectdb;