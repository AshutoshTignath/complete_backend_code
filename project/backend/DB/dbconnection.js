import mongoose from "mongoose";

export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"TODO_APPLICATION",
    }).then(()=>{
        console.log("connected to database successfully")
    }).catch(error=>{
         console.log(`some error occured while connecting to database: ${error}`)
    });
    
}