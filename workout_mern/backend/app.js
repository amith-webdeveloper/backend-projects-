import express from 'express';
const app = express()
import noteModel from './models/note.model'


app.get('/' , function(req , res){
    res.send('hi')
})

export default app;