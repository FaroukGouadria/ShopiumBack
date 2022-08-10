const mongoose = require("mongoose");

const reviewsModel = mongoose.Schema({
    userId:{
        type:String,
       required:true
    },
    offreId:{
        type:String,
        ref:'Offre',
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
