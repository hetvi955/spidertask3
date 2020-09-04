const mongoose=require('mongoose');
const Product =require('../models/item');

const connectdb= async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true

    });
    const products = [
        new Product({
            image:'https://www.incimages.com/uploaded_files/image/1920x1080/getty_496612468_2000138820009280460_336567.jpg',
            title:'books',
            description:'useful!',
            price: 54
        })
    ];
    
    console.log(`connected to: ${conn.connection.host}`)
};

module.exports=connectdb;