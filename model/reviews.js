const mongoose = require("mongoose");

const reviewsModel = mongoose.Schema({
    userId:{
        type:String,
       required:true
    },
    productID:{
        type:String,
        ref:'Product',
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },CreatedAt:{
        type:Date,
        default:Date.now()
    },userName:{
        type:String
    },
    rating:{
        type:Number,
    },
});

module.exports = mongoose.model("Reviews", reviewsModel);
