const bodyParser = require("body-parser");
const User = require("../model/user");
const { sendError } = require("../utils/helper");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {createUSer, signin, verifyEmail, forgotPassword, resetPassword,getMe, Me, updateImageUser, updateProfile, sendRequestFriend, getFriendRequest, acceptFriend, getAmi, getSendRequest, addToWishlist, wishlist, removeFromWishlist, addToWish, getWishlist, removeWishlist, addToWishList, WishList, removeFromWishList, likedOffer} = require("../controller/auth")
const cloudinary = require("../utils/cloudinary");
const {isAuth, auth} = require("../middleware/isAuth");
const {isResetTokenValid} = require("../middleware/user");
const { error } = require("console");
const { body } = require("express-validator");
const upload=require('../utils/multer');
const { userUpdate } = require("../controller/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.post("/create",createUSer);
router.post("/signin", signin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", isResetTokenValid, resetPassword);
router.put("/update",updateProfile);
router.post("/secret", isAuth, (req, res) => {
  res.send("welcome");
});
router.post("/me",getMe);
router.post("/getMe", Me); 
router.post("/parrainage",sendRequestFriend);
router.post('/requestfriend',getFriendRequest);
router.post("/sendrequest", getSendRequest);
router.post("/accept", acceptFriend);
router.post('/imageUpdate',userUpdate);
router.post("/ami", getAmi);
router.post('/wish',addToWish);
router.post('/getwish',getWishlist);
router.post('/delete_Wish',removeWishlist);
////try2
router.post("/addwishlist", addToWishList);
router.post("/getwishlist", WishList);
router.post("/deleteWish", removeFromWishList);
router.post("/checkLiked", likedOffer);
// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//       cb(null,'images/user')
//   },
//   filename:(req,file,cb)=>{
//     cb(null,file.originalname);
//   },
// })

// const upload = multer({storage:storage});

// router.post('/imageup',uploade.single('photo'),async(req,res)=>{
//       const id =req.body.id;
//       const user = await User.findOne({id});
//       console.log(user);
//       if(!user){
//         res.status(404).json({success:false,message:'User Not Found !!!!'})
//       }
//       User.findOneAndUpdate({id},{
//         photo:{
//           data:fs.readFileSync("images/user/" + req.file.filename),
//           contentType:'image/png',
//         }
//       }).then((res)=>{res.status(200).json({success:true,message:"User Image Updated Successfully",user:res})}).catch((error)=>res.status(500).json({success:false,message:"error server",res:error}))
// });

router.get('/getImageUser',async(req,res)=>{
    const id = req.body.id;
    const user = await User.findOne({id});
    res.status(200).json({user:user.photo.data});
});

router.put("/b", upload.single("photo"), async (req, res) => {
  try {
    let user = await User.findOne({id:req.body.id});
    //   const {file}=req.file;
    // console.log(file);

    console.log(user);
    // const result1 = await cloudinary.uploader.upload(req.file.path);
    // Delete image from cloudinary
    // console.log({result1});
    console.log(req.body);
    let info= await cloudinary.uploader.upload(req.body.uri);
    console.log({info})
    // Upload image to cloudinary
    // let result = await cloudinary.uploader.upload(path.path);
    //   console.log({result})

    const data = {
      photo: info?.secure_url || user.photo,
      cloudinary_id: info?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.body.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});


// router.route("/updateImage").put(uploadd.single('photo'),async(req,res,next)=>{
//     try {
//         // let {file} = req; 
//         // console.log(file)
      
//         console.log(req.body)
//          let path = req.file;
//          let photos=req.body.photo;
//           console.log({photos:photos._parts});
//         const id=req.body.id;
//                 console.log(id);
//         const image = photos;
//         const user = User.findOne({id});
//         console.log(user); 
//   const upUser=await  User.findByIdAndUpdate(id,{
//       $set:{
//         photo:image,
//       }
//     });
//     return res.status(200).json({success:true,message:'user Updated successfully', data:upUser});
//     } catch (error) {
//         console.log(error.message); 
//         return res.status(500).json({success:false,msg:'server error'})
//     }
// });
// router.post('/user/me/avatar',updateImageUser);
// var upload1 = multer({dest: "images/user"}); //setting the default
// router.post("/uploadd", upload1.single("photo"), (req, res, next) => {
//   console.log(req.file); //this will be automatically set by multer
//   console.log(req.body);
//   //below code will read the data from the upload folder. Multer     will automatically upload the file in that folder with an  autogenerated name
//   fs.readFile(req.file.path, (err, contents) => {
//     if (err) {
//       console.log("Error: ", err);
//     } else {
//       console.log("File contents ", contents);
//     }
//   });
// });
// router.put("/userImag", uploadd.single("photo"),async (req, res, next) => {
//   const url = req.file;
//   console.log({url:url});
//   const id= req.body.id;
//   console.log(id);
//   const photo= url;
//   console.log(photo)
//   const user = User.findOne(id);
// console.log(user);
//   const userUp = await User.findByIdAndUpdate(id,{
//     $set:{
//         photo:photo
//     }
//   });

//   userUp.save().then(result => {
//     console.log(result)
//     res.status(201).json({
//       message: "User updated successfully!",
//       UserUpdated: {
//         id: result.id,
//         profileImg: result.photo
//       }
//     });
//   }).catch(err => {
//     console.log(err),
//     res.status(500).json({error: err});
//   });
// });


module.exports = router;
