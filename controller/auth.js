const User = require("../model/user");
const {sendError, createRandomBytes} = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {generateOTP, transporter} = require("../utils/mail");
const VerificationToken = require("../model/verificationToken");
const {isValidObjectId} = require("mongoose");
const ResetToken = require("../model/resetToken");
const crypto = require("crypto");
const multer = require("multer");
const image = ('/images/user/photo_1652707413348_farouk.jpg');
const referralCodes=require('referral-codes');
exports.createUSer = async (req, res) => {
  const {
    nom,
    prenom,
    ville,
    pays,
    email,
    password,
  } = req.body;
  const user = await User.findOne({email});
  console.log({user})
  if (user) {
    return sendError(res, "This email is already exists!");
  }
  const token = jwt.sign({
    userId:Math.random(10)
  }, process.env.JWT_SECURE , {expiresIn: "1d"});
  
  const code = referralCodes.generate({
        count: 1,
        length: 6,
        charset: "0123456789"
    });
    let codepar=code[0];

  const newUser = new User({
    nom,
    prenom,
    ville,
    pays,
    email,
    password,
    role: "subscriber",
    photo:image,
    cloudinary_id:"",
    codeParrainage:codepar
  });
  const OTP = generateOTP();
  console.log(OTP);
  const verificationToken = new VerificationToken({owner: newUser._id, token: OTP});
  await verificationToken.save();
  await newUser.save();
  console.log({newUser});
  const msg = {
    from: "appshopium@gmail.com", // sender address
    to: newUser.email, // list of receivers
    subject: "Verify your account ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>${OTP}</h1>` // html body
  };
  await transporter.sendMail(msg);

res.send({
    success: true,
    user: {
      nom: newUser.nom,
      email: newUser.email,
      id: newUser._id,
      verified: newUser.verified,
      ville:newUser.ville,
      pays:newUser.pays,
      photo:newUser.photo,
      codeParrainage:code
    },
  });
};

exports.signin = async (req, res) => {
  const {email, password} = req.body;
  if (!email.trim() || !password.trim()) {
    return sendError(res, "email/password missing!");
  }
  const user = await User.findOne({email});
  if (!user) {
    return sendError(res, "User not found!");
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return sendError(res, " email/password does not match!");
  }
const token = jwt.sign({
  user: user,
}, process.env.JWT_SECURE, {expiresIn: "1d"});
  res.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
      verified:user.verified,
      token
    },
    id: user._id,
    verified:user.verified,
    token
  });
};

exports.verifyEmail = async (req, res) => {
  const userId =req.body.userId;
  const otp=req.body.otp
  console.log(userId);
  console.log(otp)
  if (!userId || !otp.trim()) 
    return sendError(res, "Invalid request ,missing parameters");
  if (!isValidObjectId(userId)) 
    return sendError(res, "Invalid user ID ! ");
  
  const user = await User.findById(userId);
  if (!user) 
    return sendError(res, "Sorry,user not Found !");
  
  if (user.verified) 
    return sendError(res, "This account is already verified!");
  const token = await VerificationToken.findOne({owner: user._id});
  if (!token) 
    return sendError(res, "Sorry, user not found!");
  
  const isMatched = await token.compareToken(otp);
  if (!isMatched) 
    return sendError(res, "Please provide a valid token!");
  user.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();
  const msg = {
    from: "appshopium@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: "Email Verified Successfully ✔", // Subject line
    html: `<h1>Thanks for connecting with us</h1>` // html body
  };
  await transporter.sendMail(msg);
  res.json({
    success: true,
    message: "your email is verified.",
    user: {
      nom: user.nom,
      email: user.email,
      id: user._id,
    },
    token: user.token,

  });
};
exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  if (!email) 
    return sendError(res, "Please provide a valid email!");
  const user = await User.findOne({email});
  if (!user) 
    return sendError(res, "User not found, invalid request!");
  let token = await ResetToken.findOne({owner: user._id});
  if (!token) {
    token = await new ResetToken({owner: user._id, token: crypto.randomBytes(32).toString("hex")}).save();
    console.log(token.token);
    const msg = {
      from: "appshopium@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Password Reset", // Subject line
      html: `http://localhost:8000/reset-password?token=${token.token}&id=${user._id}` // html body
    };
    await transporter.sendMail(msg);
    res.json({success: true, message: "Password reset Link is sent to your email",token:token.token, id:user._id});
  } else {
    return sendError(res, "Only after one hour you can request for another token");
  }
};
exports.resetPassword = async (req, res) => {
  const {password} = req.body;

  const user = await User.findById(req.user._id);
  if (!user) 
    sendError(res, "user not found !");
  
  const isSamePassword = await user.comparePassword(password);
  if (isSamePassword) 
    return sendError(res, "new Password must be different !");
  
  if (password.trim().length < 8 || password.trim().length > 20) 
    return sendError(res, "password must be 8 to 20 characters long !");
  user.password = password.trim();
  await user.save();

  await ResetToken.findOneAndRemove({owner: user._id});
  const msg = {
    from: "appshopium@gmail.com", // sender address
    to: user.email, // list of receivers
    subject: "Password Reset Successfylly", // Subject line
    html: `Now ${user.nom} you can login with new Password` // html body
  };
  await transporter.sendMail(msg);
  res.json({success: true, message: "Password Reset Successfully"});
};

exports.getMe = async(req,res)=>{
  const token=req.body.token;
  console.log({token});
  if(!token)
    return sendError(res, "Invalid request ,missing parameters");
   jwt.verify(token,process.env.JWT_SECURE,(err,user)=>{
     if(err){
        return sendError(res, "token Invalid");
     }else{
      return res.status(200).json(user)
     }
   })
}
exports.Me = async(req,res)=>{
  const id=req.body.id;
  console.log({id});
  try {
    if(!id){
      return res.status(400).json({success:false, message:"Invalid request ,missing parameters"});
    }
    const user = await User.findById(id);
    console.log(user);
       if(!user){
          return res.status(404).json({success:false, message:"User Not Found"});
       }else{
        return res.status(200).json({success:true, user});
       }
  } catch (error) {
    return res.status(500).json({success:false, message:error});
  }
};
// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'))
//         }

//         cb(undefined, true)
//     }
// })

// exports.updateImageUser = async(req,res)=>{
//   upload.single('avatar');
//     req.user.avatar = req.file.buffer
//     await req.user.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// }
exports.updateProfile =  async (req , res) => {
    try {
        const 
            id = req.body.id,
            nom= req.body.nom,
            prenom=req.body.prenom,
            ville= req.body.ville,
            pays= req.body.pays;
            console.log(req.body.id);
    const user = await User.findById(req.body.id)
        if(user){
          user.nom=nom||user.nom
          user.prenom=prenom||user.prenom
          user.ville=ville||user.ville
          user.pays = pays || user.pays;
        }
        const updateUser = await user.save();
      res.status(200).json({success:true,message:'update success for user',data:updateUser})

    }catch (error){
        console.log(error.message)
        return res.status(500).json({msg :'server error'})
    }
  }
  exports.sendRequestFriend = async (req,res)=>{
   try {
     const code = req.body.codeParrainage;
     const id= req.body.id;
     console.log(code);
     console.log(id);
     const user = await User.findOne({codeParrainage:req.body.codeParrainage});
     if(!user)
        {return res.status(404).json({success:true,message:"USer not found"});}
     const me = await User.findById(req.body.id);
     if(!me)
      return res.status(404).json({success:true,message:'User not found'});
    await User.updateOne({_id:user.id},{
       $push:{friendRequest:{nom:me.nom, prenom:me.prenom, id:me._id}}
     });
    await User.updateOne({_id:me.id},{
       $push:{sendRequest:{nom:user.nom,prenom:user.prenom,id:user._id}}
     });
   return res.status(200).json({success:true,user:user,me:me});
   } catch (error) {
    return res.status(500).json({success: true, message:error});


  }
  }

  exports.getFriendRequest = async (req,res)=>{
    try {
      const id=req.body.id;
      console.log(id);
        let data = await User.findById(id,{friendRequest:true})
        console.log(data);
        if(!data){
          res.status(404).json({success:false,message:'User Not Found'});
        }
        res.status(200).json({success:true,data:data.friendRequest});
    } catch (error) {
      res.status(500).json({success: false, message:error});

  }
}
exports.getSendRequest = async (req,res)=>{
    try {
      const id=req.body.id;
      console.log(id);
        let data = await User.findById(id,{sendRequest:true})
        console.log(data);
        if(!data){
          res.status(404).json({success:false,message:'User Not Found'});
        }
        res.status(200).json({success:true,data:data.sendRequest});
    } catch (error) {
      res.status(500).json({success: false, message:error});

  }
}
exports.acceptFriend =async (req,res)=>{
  try {
    const id = req.body.id;
    console.log(id);
    const user = await User.findById(id);
    console.log({user});
    const friendId= user.friendRequest[0].id;
    console.log({friendId});
    console.log('section friend');
    const friend = await User.findById(friendId);
    console.log({friend})
    if(!user){
      res.status(404).json({success:false,message:'User not found !!'})
    }
    await User.updateOne({_id:user.id},{
       $push:{ami:{nom:friend.nom, prenom:friend.prenom, id:friend._id}},
     });
     await User.updateOne({_id:user.id},{
      $pull:{friendRequest:{}}
     });
    await User.updateOne({_id:friendId},{
       $push:{ami:{nom:user.nom,prenom:user.prenom,id:user._id}},
     });
     await User.updateOne({_id:friendId},{
       $pull:{sendRequest:{}}
       
     });
   await res.status(200).json({success:true,message:'success',user:user,friend:friend})
  } catch (error) {
     res.status(500).json({success:false,message:'success',error:error})
     console.log(error);
  }
}

exports.getAmi=async(req,res)=>{
  try {
    const id=req.body.id;
    console.log(id);
    const data = await User.findById(id);
     console.log({data});
    if(!data){
      res.status(404).json({success:false,message:'User not found !!'})
    }
    // user.ami.forEach(element=>console.log(element.prenom));

    res.status(200).json({success:false,message:'Success',data:data.ami})
  } catch (error) {
    res.status(500).json({success:true,message:'success',error:error})
  }
}

