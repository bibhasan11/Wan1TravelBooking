import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import tourRoute from './routes/tour.js'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import bookingRoute from './routes/bookings.js'
 import paymentRoute from './routes/payment.js'
import path from 'path';



dotenv.config()
const app=express()

const port =process.env.PORT|| 8000
const  corsOptions={
    origin:true,
    credential:true
}


const __dirname = path.resolve(); // Ensure __dirname is correctly set

app.use('/public', express.static(path.join(__dirname, 'public')));

//database connect
mongoose.set("strictQuery",false)
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
          
            
        })
        console.log('Mongodb connected');
    }catch(err){
        console.log('connection failed',err.message)
    }
}





//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/tours',tourRoute)
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/booking",bookingRoute)
app.use("/api/v1/payment",paymentRoute)


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});



app.listen(port,()=>{
    connect();
    console.log('server is listening ',port)
})