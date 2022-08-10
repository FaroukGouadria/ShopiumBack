const User = require("../model/user");
const Products = require("../model/ProductModel");
const Reviews = require("../model/reviews");
const { findById } = require("../model/ProductModel");

exports.ajouterCommentaire = async (req, res) => {
  try {
    let image;
    let userName;
    const {userId, text, rating} = req.body;
    console.log(rating);
    const _id = req.body.productId;
    console.log(_id);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({res: "user not Found  !"});
    } else {
      image = user.photo;
      userName = user.nom + " " + user.prenom;
    }
    const product = await Products.findById(_id);
    if (!product) {
      return res.send({message: "product Not found !"});
    } else {
      console.log({prod:product.offer});
    }
    const newReview = new Reviews({
      userId: userId,
      offreId: product.offer[0],
      text: text,
      image: user.photo,
      userName: user.nom + "" + user.prenom,
      rating: rating
    });
    user.reviewsCount = user.reviewsCount + 1;
    await newReview.save();
    await user.save();
    return res.status(200).json({message: "success", data: newReview, user: user.reviewsCount});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.toutCommentaires = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    return res.status(200).json(reviews);
  } catch (error) {
    res.json(error);
  }
};
exports.getCommentaireByProduct = async (req, res) => {
  try {
    const productID = req.body.productId;
    console.log({productID});
    const product = await Products.findById(productID);
    if (product) {
      const offreId = product.offer[0];
      console.log(offreId);
      const reviews = await Reviews.find({offreId});
      console.log(reviews);
      return res.status(200).json(reviews);
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
exports.countReviews = async (req, res) => {
  const _id = req.body.id;
  console.log({_id});
  try {
    const product = await Products.findById(_id);
    const offerId=product.offer[0];
    const countReviews = (await Reviews.find({offerId})).length;
    const reviews = await Reviews.find({productID: _id});
    const SUMReviews = reviews.map(item => item.rating).reduce((prev, curr) => prev + curr, 0);
    console.log(SUMReviews);
    const AVGReviews = (SUMReviews / countReviews).toPrecision(1);
    const offer = await findById(offerId);
    if(offer){
        offer.avgReviews = AVGReviews;
        await offer.save();
        return res.status(200).json({reviews: reviews, AVGReviews: AVGReviews, countReviews: countReviews,offer:offer});
    }else{
           return res.status(404).json({message:'offer not found'});
    }
    
  } catch (error) {
    console.log({error});
     return res.status(500).json({message: error});
  }
  
};
