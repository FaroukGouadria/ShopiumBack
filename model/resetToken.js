const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const resetTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now()
  }
});

resetTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});
resetTokenSchema.methods.compareToken = async function (token) {
  console.log(token);
  const result =await  bcrypt.compareSync(token, this.token);
  console.log("result : " ,result);
  return  result;
};

module.exports = mongoose.model("ResetToken", resetTokenSchema);
