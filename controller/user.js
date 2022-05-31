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
        id=req.params.id,
        photo=req.body.photo

     const user = await User.findByIdAndUpdate({_id:id},{
            photo:photo
        });
        console.log(user);
        user.save();
    return res.status(200).json({success:true,message:'user Updated successfully', data:user});

    } catch (error) {
        console.log(error)
        return res.status(400).send({success:false,msg:res.error.message})
    }
}