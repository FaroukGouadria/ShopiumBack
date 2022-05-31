const Fabricant = require("../model/fabricant");
const ProductModel = require("../model/ProductModel");



exports.add = async(req,res)=>{
    try {
        const {name,email,password,logo,codeTVA,RIB,phone,products}=req.body;
        const fabricant = await fabricant.findOne({email});
        if(fabricant)
            return res.status(404).json({success:false,messsage:'déja Exist'});
        const newFabricant = new Fabricant({
            name:name,
            email:email,
            logo:logo,
            codeTVA:codeTVA,
            RIB:RIB,
            phone:phone,
            products,
        });

        await newFabricant.save();
        return res.status(200).json({success:true,message:'ajouter avec success',data:newFabricant});
    } catch (error) {
        return res.status(500).json({success:false,message:'server error'});
    }
}