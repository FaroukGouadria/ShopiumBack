const mongoose = require('mongoose')


const subCategorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    categoryID:{
        type:String,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product',
    }],
}, 
   { timestamps: true},
    {versionKey: true }//here
);

module.exports  = mongoose.model("SubCategory", subCategorySchema);