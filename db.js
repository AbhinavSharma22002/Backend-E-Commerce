const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://abhinav_22002:abhi123%4020022@cluster0.y0xrk.mongodb.net/?retryWrites=true&w=majority";


const connectToMongo = async()=>{
    await mongoose.connect(mongoURI, ()=>{
        console.log("Connected to database")
    });
}

module.exports = connectToMongo;