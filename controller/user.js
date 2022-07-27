const User = require("../model/user");
const {sendError} = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {generateOTP, transporter} = require("../utils/mail");
const VerificationToken = require("../model/verificationToken");
const {isValidObjectId} = require("mongoose");
const ResetToken = require("../model/resetToken");
const crypto = require("crypto");


exports.userUpdate =async (req,res)=>{
    try {
        const 
        _id=req.body._id,
        photo=req.body.photo
        console.log(photo)
        console.log(_id);
      await User.findByIdAndUpdate(_id,{
            photo:photo
        });
        const user = await User.findById(req.body._id);
        console.log(user)
            if(user){
                
                return  res.status(200).json({success:true,message:'user Updated successfully', data:user.photo});
            }else{
                 return res.status(404).send({success:false, message:'User not found'})
            }
        
        // await user.save();

    } catch (error) {
        console.log(error)
        return res.status(400).send({success:false, message:res.error.message})
    }
}