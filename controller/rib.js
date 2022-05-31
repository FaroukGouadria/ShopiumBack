const { sendError } = require("../utils/helper");
const User = require("../model/user");
const Rib = require("../model/Rib");

exports.add = async (req, res)=>{
    try {
        const userId=req.body.userId;
        const {numero,key,type,nom,banque,expDate}=req.body
        console.log(numero);
        console.log({userId});
        const user  =  await User.findOne({userId});
        console.log(user)
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        const rib = new  Rib({
            userId,
            numero,
            key,
            type:type || 'paypal',
            banque,
            nom,expDate
        });
        await rib.save();
        res.status(200).json({success:true,message:'Rib ajuoter avec success',data:rib})
    } catch (error) {
        res.status(500).json({success:false,message:error})
        console.log(error)
    }
}

exports.getRibByUser=async (req,res)=>{
    try {
        const userId = req.body.userId;
         console.log({userId});
            const user  =  await User.findOne({userId});
            console.log(user)
            if(!user){
                return res.status(404).json({success:false,message:"user not found"})
            }
            const ripUser = await Rib.find({userId});
            if(!ripUser){
                return res.status(404).json({success:false,message:"Card Not found"})
            }else {
                console.log({data:ripUser});
                return res.status(200).json({success:true,message:'card User Found',ripUser:ripUser});
            }
    } catch (error) {
            res.status(500).json({success:false,message:error})
        console.log(error)
    }
}