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
    required:true
  },fabricant:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Fabricant'
  }
}, {
  timestamps: true //important
});

module.exports = mongoose.model("Products", productSchema);
