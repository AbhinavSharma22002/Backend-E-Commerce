const mongoose = require('mongoose');
const { Schema } = mongoose;
const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment:{
        type: Number,
        required: true
    },
    address:{
      type: String,
      required: true
    },
    number:{
      type: String,
      required: true
    },
    pin:{
      type: String,
      required: true
    },
    Card_number:{
      type: String,
      required: true
    },
    Name_card:{
      type: String,
      required: true
    },
    Expire:{
      type: String,
      required: true
    },
    order:[{
        id:{type: mongoose.Schema.Types.ObjectId,
        required: true
        },
        number:{
          type: Number,
          required: true
        }
    }], 
});

const Delivery = mongoose.model("Orders", OrderSchema);
module.exports = Delivery;