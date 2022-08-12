const ProductModel = require("../model/ProductModel");
const User = require("../model/user");
const WishList = require("../model/WishList");

exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.body.productId;
    const id = req.body.id;
    const userId = req.body.userId;
    const product = await ProductModel.findById(productId);
    const wish = await WishList.findOne({name:product.name})
    if(wish && wish.userId===userId){
      return res.status(404).json({message:"offer exist deja "})
    }
    const wishList = new WishList({
        userId: id,
        name: product.name,
        logo:product.logo,
        photo:product.photo[0],
    });
    await wishList.save();
    return res.status(200).json({ok: true, wishList: wishList});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  } 
};

exports.getwishlist = async (req, res) => {
    try {
        const userId = req.body.id;
        console.log({userId})
        const list = await WishList.find({ userId});
          if(list)
              console.log(list)
       return  res.json({list});
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
      const id = req.body;
      console.log({id})
      const wishlist = await WishList.findByIdAndDelete({id})
      console.log({wishlist})
      if(wishlist){
        
        return res.json("supprimer avec Success");
      }else{
        return  res.json("supprission a échoué")
      }
    } catch (error) {
     return  res.json({error})
    }
};