const Fabricant = require("../model/fabricant");
const offresModel = require("../model/offresModel");

const Offre = require("../model/offresModel");
const ProductModel = require("../model/ProductModel");
const Product = require('../model/ProductModel');
const { getFabricantByProduct } = require("./product");
const offerCrtl ={
    createOffer : async(req,res)=>{
        try {
            const {startDate,expirationDate,condition,description,quantity,percentage,product}=req.body;
            // if(startDate.getTime()>expirationDate.getTime() || expirationDate.getTime()<startDate.getTime())
            //     return res.status(400).json({msg:'Start Date must be earlier than expiration Date '})
            const checkproduct = await Product.findOne({product})
            if(!checkproduct){
                res.status(500).json({msg: "product not found !"});}
            const newOffer = new Offre({
                startDate,
                expirationDate,
                condition,
                description,
                quantity,
                percentage,
                product,
                isLiked:0
                });

            await newOffer.save();
            await Product.updateMany({'id':newOffer.product},{$push:{offer:newOffer._id}});
            res.json({msg: " Offer Created Successfully",data:newOffer});

        } catch (error) {
            console.log(error);
           return res.status(500).json({msg: error.message})
        }
    },

    getProductByOffer:async(req,res)=>{
        const id= req.body.id;
        const offer = await Offre.findById({_id:id})
        console.log(offer)
     const product = await ProductModel.findById(offer.product)
        console.log(product)
        
        const fabricant = await Fabricant.findById({_id:product.fabricant})
        console.log(fabricant)
        res.send(fabricant);
}, 
 deleteOffre: async(req, res) =>{
        try {
            await Offre.findByIdAndDelete(req.body.id)
            res.json({msg: "Deleted a offer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getOffers:async(req,res)=>{
        try {
            const offers = await offresModel.find();
            return res.status(200).json(offers)
            
        } catch (error) {
            res.json(error)
        }
}
}
module.exports = offerCrtl;
