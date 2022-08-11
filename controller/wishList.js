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
    return res.status(200).json({ok: true, wishList: WishList});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  } 
};

exports.wishlist = async (req, res) => {
  const id = req.body.id;
  const list = await WishList.findOne({_id: id}).select("whishlist").populate("whishlist").exec();

  res.json(list);
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