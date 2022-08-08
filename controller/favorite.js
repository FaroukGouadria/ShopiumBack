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
         return res.json({user})
        }
          const product  = await ProductModel.findById({_id:idProduct})
          if(product){
            console.log({product})
            return res.json({product})
          }
        
      } catch (error) {
        console.log({error})
        return res.status(500).json({error})
      }
    }
  };

module.exports = FavoriteCtrl;
