const User = require("../model/user");
const Products=require('../model/ProductModel');
const Reviews = require("../model/reviews");


exports.ajouterCommentaire=async(req,res)=>{
    try {
        let image;
        let userName ;
        const{
            userId,text,rating,
        }=req.body;
        console.log(rating);
        const _id = req.body.productId;
        console.log(_id)
        const user = await User.findOne({userId});
        if (!user) {
      return  res.status(404).json({ res:"user Not found !"});
    }else{
        image=user.photo;
        console.log(image);
        userName=user.nom +' '+user.prenom
    }   
    const product = await Products.findOne({_id});
       if (!product) {
      return  res.send({ message:"product Not found !"});       
    }else{
        console.log({product});
    }
        const newReview = new Reviews({
                userId:userId,
                productID:_id,
                text:text,
                image:user.photo,
                userName:userName,
                rating:rating,
        });
        await newReview.save();
        return res.status(200).json({message:"success",data:newReview})
    } catch (error) {
        return  res.status(500).json(error);
    }
}
exports.toutCommentaires=async(req,res)=>{
     try {
            const reviews = await Reviews.find();
            return res.status(200).json(reviews)
            
        } catch (error) {
            res.json(error)
        }
}
exports.getCommentaireByProduct=async(req,res)=>{
    try {
        const productID = req.body.productId;
        console.log({productID})
        const reviews = await Reviews.find({productID})
        console.log(reviews);
        return res.status(200).json(reviews)
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}