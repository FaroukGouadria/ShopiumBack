const mongoose = require('mongoose')


const FabricantSchema = new mongoose.Schema({
   name:{
       type:String
   },
   email:{
       type:String
    },
    password:{
        type:String
    },
    logo:{
        type:String
    },
    CodeTVA:{
        type:String
    },
    RIB:{
        type:String
    },
    phone:{
        type:String,
    },
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
    }
}, {
    timestamps: true
});

module.exports  = mongoose.model("Fabricant", FabricantSchema)