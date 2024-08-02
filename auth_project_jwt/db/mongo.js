
const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost:27017/amithlogin').then(()=>{
    console.log('mongodb connected..');
    
}).catch((err)=>{
    console.log('Error:' + err);
    
})
