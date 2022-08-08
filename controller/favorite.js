const ProductModel = require("../model/ProductModel");
const User = require("../model/user");

 const FavoriteCtrl = {
    addFavorite : async(req,res)=>{
      try {
        const {idUser,idProduct}=req.body;
        console.log({user:idUser,product:idProduct})

        const user = await User.findById({_id:idUser})
        if(user)
        {
          console.log({user})
          const product  = await ProductModel.findById({_id:idProduct})
          console.log({product})
        }
        
      } catch (error) {
        console.log({error})
      }
    }
  };

module.exports = FavoriteCtrl;
