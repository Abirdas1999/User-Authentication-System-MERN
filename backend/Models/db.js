const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })

    // import mongoose from 'mongoose';

    // export const connectDB = async ()=>{
    //     try {
    //         const conn = await mongoose.connect(process.env.MONGO_CONN)
    //         console.log(`MongoDB is Connected: ${conn.connection.host}`);
    //     } catch (error) {
    //         console.log("Error connection to MongoDB: ", error.message);
    //         process.exit(1)//1 failure,0 status code is success
            
    //     }
    // }