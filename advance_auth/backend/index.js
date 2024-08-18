import 'dotenv/config'
import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js'

const app = express()
const Port = process.env.PORT || 8000;


app.use(express.json())

app.use('/api/auth' , authRoutes)

app.listen(3000, function(){
    connectDB();
    console.log('server is listening at port 3000');
    
})