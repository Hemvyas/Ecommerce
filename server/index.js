const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const cors=require("cors");
const cookieParser = require('cookie-parser');
const authRoute  = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const productRoute=require("./routes/productRoute");
const cartRoute= require("./routes/cartRoute");
const orderRoute= require("./routes/orderRoute");
const Product=require("./models/Product")
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
console.log("DB Connected");
}).catch((err)=>{
console.log(err);
})


const productsData = require('../client/src/productData');
Product.insertMany(productsData)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  });

app.listen(process.env.PORT,()=>{
    console.log("Port Started at 5000");
})
