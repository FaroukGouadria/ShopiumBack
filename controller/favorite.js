const Favorite = require("../model/Favorite");
const ProductModel = require("../model/ProductModel");
const User = require("../model/user");

 const FavoriteCtrl = {
    addFavorite : async(req,res)=>{
      try {
        const idUser=req.body.idUser;
        const idProduct=req.body.idProduct;
        console.log({user:idUser,product:idProduct})
        
        const user = await User.findById({_id:idUser})
        if(user)
        {
          console.log({user})
        }else{
          // return res.status(404).json({message:'User Not Found'})
          return res.status(404).json({message:'User Not Found, PLZ verified !!!'})
        }
          const product  = await ProductModel.findById({_id:idProduct})
          if(product){
            console.log({product})
            if (product.isLiked === false) {
              product.isLiked = true
              const favorite = new Favorite({
                UserId:idUser,
                product:idProduct
              });
              await favorite.save();
            }else{
              product.isLiked = false
              const favor = await Favorite.findOneAndDelete({product:idProduct});
              await favor.save();
            }
          }
          await product.save();
          return res.json({user:user,product:product})
      } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
      }
    }
  };

module.exports = FavoriteCtrl;
