import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const MongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to DB")
    }

    catch(error){
        console.log("Error connecting DB", error.message)
    }
}

export default MongoDB;