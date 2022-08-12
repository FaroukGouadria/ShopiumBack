const mongoose = require('mongoose')


const wishListSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        trim:true
    },
        name:{
            type:String
        },
        logo:{
          type:String  
        },
        photo:{
                type:Array,
                required:true
             },
        descreption:{
            type:String
        },productId:{
            type:String,
            trim:true,
            required:true,
        }

}
);

module.exports  = mongoose.model("WishList", wishListSchema);