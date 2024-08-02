// const mongoose = require('mongoose')


const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost:27017/amithlogin').then(()=>{
    console.log('mongodb connected..');
    
}).catch((err)=>{
    console.log('Error:' + err);
    
})


const UserSignupSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    token : {
        type : String,
        required:true
    },
    
})

const SignupUserSchema = new mongoose.model("signup" , UserSignupSchema)

module.exports = SignupUserSchema