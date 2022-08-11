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