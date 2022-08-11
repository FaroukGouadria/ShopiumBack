const mongoose = require('mongoose')


const wishListSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Object,
        required:true,
        ref:'Product',
    },
}
);

module.exports  = mongoose.model("WishList", wishListSchema);