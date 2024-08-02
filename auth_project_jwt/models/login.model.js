const mongoose = require('mongoose')

const userLoignSchema = mongoose.Schema({
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

const LoginUserSchema = new mongoose.model("login" , userLoignSchema)

module.exports = LoginUserSchema