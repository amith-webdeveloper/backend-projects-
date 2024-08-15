import express from 'express';
import noteModel from './models/note.model.js';
const app = express()



app.get('/' , async function(req , res){
    try {
        // throw Error
        const notes = await noteModel.find().exec();
        res.status(200).json(notes)
        
    } catch (error) {
        console.log("something gone wrong");
        res.status(500).json({err: error})
        
    }
})


app.use(function(err , req , res , next){


})
export default app;