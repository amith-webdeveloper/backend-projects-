import { Schema } from "mongoose";
import mongoose from "mongoose";

const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
    }
},{timestamps:true})


export default mongoose.model('note' , noteSchema)