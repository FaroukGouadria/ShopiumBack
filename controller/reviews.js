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
        const user = await User.findById(userId);
        if (!user) {
      return  res.status(404).json({ res:"user not Found  !"});
    }else{
        image=user.photo;
        userName=user.nom +' '+user.prenom
      
    }   
    const product = await Products.findById(_id);
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
                userName:user.nom+''+user.prenom,
                rating:rating,
        });
        user.reviewsCount=user.reviewsCount+1;
        await newReview.save();
        await user.save();
        return res.status(200).json({message:"success",data:newReview,user:user.reviewsCount})
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
exports.countReviews=async(req,res)=>{
    const id=req.body.id;
    console.log({id});
    try {
        const countReviews = (await Reviews.find({productID:id})).length;
        const reviews = await Reviews.find({productID:id});
       const SUMReviews= reviews.map(item=>item.rating).reduce((prev,curr)=>prev+curr,0);
       console.log(SUMReviews)
        const AVGReviews = (SUMReviews/countReviews).toPrecision(1);
        res.json({reviews:reviews,AVGReviews:AVGReviews,countReviews:countReviews})
    } catch (error) {
        console.log({error})
    }
}