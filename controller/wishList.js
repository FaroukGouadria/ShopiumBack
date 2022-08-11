const ProductModel = require("../model/ProductModel");
const User = require("../model/user");
const WishList = require("../model/WishList");

exports.addToWishlist = async (req, res) => {
  try {
    const productId = req.body.productId;
    const id = req.body.id;
    const product = await ProductModel.findById(productId);
    const wishList = new WishList({
        userId: id,
        offer: product
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
        
        const id = req.body.id;
        const list = await WishList.find({userId: id});
          if(list)
              console.log(list)
        res.json(list);
    } catch (error) {
        res.json(error)
    }
};

exports.removeFromWishlist = async (req, res) => {
  const {productId} = req.body.productId;
  const id = req.body.id;
  const user = await User.findOneAndUpdate({
    _id: id
  }, {
    $pull: {
      whishlist: productId
    }
  }).exec();

  res.json({ok: true, user: user});
};