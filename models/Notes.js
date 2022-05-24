const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    image:{
        type: String,
        required: true
    },
    payment:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    note_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'datas'
    },
    order:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    } 
    
});

const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;