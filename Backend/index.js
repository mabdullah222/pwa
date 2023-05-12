// dependencies
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

// Routes
const AuthRoutes=require('./Routes/AuthRoutes')
const MedRoutes=require('./Routes/MedicineRoutes')
const PostRoutes=require('./Routes/PostRoutes')

// middlewares
const connectdb=require('./Config/configdb')
require('dotenv').config()

// cors setting
const corsOptions=require('./Config/corsOptions')
const port=process.env.PORT

// more middlewares
const app=express();
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api',AuthRoutes);
app.use('/medicine',MedRoutes);
app.use('/Post',PostRoutes)
connectdb();




app.listen(port,()=>{
    console.log("App Running on PORT %d",port);
})

