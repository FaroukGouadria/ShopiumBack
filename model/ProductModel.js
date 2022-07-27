const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  photo:{
    type:Array,
    required:true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true,
    trim:true,
  },
  barcode:{
    type:String,
  },
  fabricant:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Fabricant',
    trim:true,
  },
  offer:{
    type:String, 
    ref:'Offre',
    trim:true
  },
  logo:{
      type:String
  },
  isLiked:{
    type:Boolean,
    default:false,
  },
  isnew:{
    type:Boolean,
    default:false,
  },
  description:{
    type:String,
  }
}, {
  timestamps: true //important
});

module.exports = mongoose.model("Products", productSchema);
