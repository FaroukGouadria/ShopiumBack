const Fidelite = require("../model/Fidelite");
const User = require("../model/user");
const { sendError } = require("../utils/helper");


const FideliteContoller = {
        addFidelite : async (req,res) =>{
            try {
                const {userId,data,magasin}=req.body;
                console.log({userId:userId});
                console.log({data});
                 console.log({magasin});
            const user = await User.findOne({userId});
            if(!user){
                return res.status(400).json({success:false,msg:'user not found'});
            }
            const carte  = await Fidelite.findOne({data:data});
            console.log({carte:carte});
            if(carte){  
                return res.status(400).json({success:false,msg:'carte deja exist'})
            }

            const cartFidelite = new Fidelite({
                data:data,
                userId:userId,
                format:"CODE128",
                magasin:magasin,

            });
            console.log(cartFidelite);
            await cartFidelite.save();
           await res.status(200).json({success:true,message:'Carte add successfully',data:cartFidelite})
            } catch (error) {
                console.log(error)
                return res.status(500).json({success:false,msg: error.message})
            }
},
        getCart: async(req, res) =>{
            try {
                const fidelite = await Fidelite.find();
                res.status(200).json({success:true,cart:fidelite})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },

        getCartById:async(req, res)=>{
            try {
                const 
                {userId}=req.body,
                carte=await Fidelite.find({userId:userId});
                if(!carte){
                    return res.status(404).json({success:false,message:'carte not found'});
                }else{
                    return res.status(200).json({success:true,carte}) 
                }

            } catch (error) {
                return res.status(500).json({success:false,message:error});
            }
        }
}
module.exports = FideliteContoller;