import mongoose from 'mongoose'
import 'dotenv/config'
import app from './app.js'

const port = process.env.PORT
const mongodb_url = process.env.MONGODB_URL



mongoose.connect(mongodb_url)
.then(()=>{
    console.log("db connected!");
    
    app.listen(port, function(){
        console.log(`server is listening at port ` + port);
    })
}).catch((err)=>{
    console.log(err);
    
})