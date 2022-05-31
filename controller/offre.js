const Offre = require("../model/offresModel");
const Product = require('../model/ProductModel');
const offerCrtl ={
    createOffer : async(req,res)=>{
        try {
            const {startDate,expirationDate,condition,description,quantity,company,percentage,product}=req.body;
            // if(startDate.getTime()>expirationDate.getTime() || expirationDate.getTime()<startDate.getTime())
            //     return res.status(400).json({msg:'Start Date must be earlier than expiration Date '})
            const checkproduct = await Product.findOne({product})
            if(!checkproduct){
                res.status(500).json({msg: "product not found !"});}
            const newOffer = new Offre({
                startDate,
                expirationDate,
                condition,description,quantity,company,percentage,product:checkproduct._id,
            });

            await newOffer.save();
            res.json({msg: " Offer Created Successfully"});

        } catch (error) {
           return res.status(500).json({msg: error.message})
        }
    }

}

module.exports = offerCrtl;
