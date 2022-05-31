const {sendError} = require("../utils/helper");
const {isValidObjectId} = require("mongoose");
const User = require("../model/user");
const ResetToken = require("../model/resetToken");
exports.isResetTokenValid = async (req, res, next) => {
  const {token, id} = req.query;
  if (!token || !id) 
    return sendError(res, "Invalid request !");
  
  if (!isValidObjectId(id)) 
    return sendError(res, "Invalid user!");
  
  const user = await User.findById(id);
  if (!user) 
    return sendError(res, "user not found !");
  
  const resetToken = await ResetToken.findOne({owner: user._id, token: token});
  //   console.log(resetToken);
  if (!resetToken) 
    return sendError(res, "Reset Token not found !");
  
    const isValid = await resetToken.compareToken(token);
    console.log(isValid);
    if (isValid)
      return sendError(res, "Reset Token is not valid !");
  req.user = user;
  next();
};
