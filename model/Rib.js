const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const ribSchema = new mongoose.Schema({
   userId:{
       type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
   },
   numero:{
       type:String,
       required:true
   },
   key:{
      type:Number, 
   },
   type:{
       type:String
   },
   nom:{
       type:String
   },
   banque:{
       type:String
   },
   expDate:{
       type:String
   }
},{
  timestamps: true //important
});

module.exports = mongoose.model('Rib',ribSchema);