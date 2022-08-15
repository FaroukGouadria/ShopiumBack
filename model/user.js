const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  photo:{
      type:String
  },
  cloudinary_id: {
    type: String,
  },
  verified:{
    type:Boolean,
    default:false,
    required:true,
  },
  codeParrainage:{
    type:Number,
  },
  ami: {
      type:[{nom:String,prenom:String,id:String}],
      default:[],
  },
  friendRequest:{
  type:[{nom:String,prenom:String, id:String}],
      default:[],
  },
  sendRequest:{
      type:[{nom:String,prenom:String,id:String}],
      default:[],
  },
  date:{
    type:String,
    
  },
  genre:{
    type:String,
  },
  reviewsCount:{
    type:Number,
  },
  whishlist:[{
   offer:Object
  }],
}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync (password, this.password);
  console.log(result);
  return result;
}
module.exports = mongoose.model("User", userSchema);
