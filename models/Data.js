const mongoose = require('mongoose');
const { Schema } = mongoose;
const DataSchema = new Schema({
    id:{
        type: Number
    },
    image:{
        type: String
    },
    name:{
        type: String
    },
    category:{
        type: String
    },
    price:{
        type: Number
    } 
    
});

const Data = mongoose.model("data", DataSchema);
module.exports = Data;