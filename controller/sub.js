const subCategory = require("../model/subCategory")

const createSubCategory = async(req,res)=>{
        try {
            const newSub = new subCategory({
                categoryId:req.body.categoryId,
                subCategory:req.body.subCategory
            });
                const sub_data = await newSub.save();
                 res.status(200).send({success:true,message:"sub added successfully",data:sub_data});
        } catch (error) {
            res.status(400).send({success:false,message:error.message});
        }


}

module.exports={
    createSubCategory
}