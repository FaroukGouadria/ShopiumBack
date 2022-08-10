const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const offreSchema = new mongoose.Schema({
    startDate:{
        type:String,
        trim:true, 
    },
     expirationDate:{
        type:String,
        trim:true,
    },
    condition:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    quantity:{
        type:Number,
        trim:true,
    },
    percentage:{
        type:Number,
        trim:true
    },product:{
        type:String,
        ref:'Products'
    },
    isLiked:{
        type:Number,
        default:0
    },
    avgReviews:{
        type:Number,
    }
},{
  timestamps: true //important
});

module.exports = mongoose.model('Offre',offreSchema);