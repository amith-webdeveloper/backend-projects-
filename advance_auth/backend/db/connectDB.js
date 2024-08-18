import mongoose from "mongoose";

const mongodb_url = process.env.MONGODB_URL

export async function connectDB(){
    try {
        const connection = await mongoose.connect(mongodb_url)
        console.log(`mongodb connected! : ${connection.connection.host}`);
        
    } catch (error) {
        console.log(`error connection to mongoDB : ` , error.message);
        process.exit(1);
        
    }

}

