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
        }),
        new Product({
            image:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fresize.hswstatic.com%2Fw_796%2Fgif%2Fhow-cds-work.jpg&imgrefurl=https%3A%2F%2Felectronics.howstuffworks.com%2Fcd.htm&tbnid=vYp_-OmSgMCqIM&vet=12ahUKEwjZ5svu79jrAhUvLLcAHeYOBusQMygHegUIARDMAQ..i&docid=fHidQzHYlfhEGM&w=796&h=448&q=cd%20images&ved=2ahUKEwjZ5svu79jrAhUvLLcAHeYOBusQMygHegUIARDMAQ',
            title:'dvds',
            description:'entertaining!',
            price: 35
        })
    ];
    
    console.log(`connected to: ${conn.connection.host}`)
};

module.exports=connectdb;