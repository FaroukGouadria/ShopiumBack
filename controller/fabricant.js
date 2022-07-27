const Fabricant = require("../model/fabricant");
const ProductModel = require("../model/ProductModel");



exports.add = async(req,res)=>{
    try {
        const {name,email,password,logo,codeTVA,RIB,phone,products}=req.body;
        const fabricant = await Fabricant.findOne({email});
        console.log({ fabricant})
        if(fabricant)
            return res.status(404).json({success:false,messsage:'déja Exist'});
        const newFabricant = new Fabricant({
            name:name,
            email:email,
            logo:logo,
            password:password,
            codeTVA:codeTVA,
            RIB:RIB,
            phone:phone,
            products:null
        });
        await newFabricant.save();
        console.log({fab:newFabricant})
        return res.status(200).json({success:true,message:'ajouter avec success',data:newFabricant});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error});
    }
}

exports.getProductByFabricant=async(req,res)=>{
    try {
        const id=req.body.id;
        console.log({id});
    
        const fabricant = await Fabricant.findOne({id});
        console.log(fabricant);
        const product = await ProductModel.findById({_id:fabricant.products})
        console.log({product});
        return product;
    } catch (error) {
        console.log(error)
    }
}