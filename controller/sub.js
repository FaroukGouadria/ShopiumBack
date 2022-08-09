const Category = require("../model/category");
const SubCategory = require("../model/subCategory");


const createSubCategory = async(req,res)=>{
    const name = req.body.name
    const categoryID=req.body.categoryID
    console.log(categoryID)
        try {
            const Sub = await SubCategory.findOne({name})
            if(Sub){
                return res.json({message:"already exist !"})
            }else{
                const newSub = new SubCategory({
                    name:name,
                    categoryID:categoryID,
                    products:[],
                });
                await newSub.save();
                await Category.updateMany({"id":newSub.categoryID},{$push:{subCategory:newSub._id}})
                res.status(200).send({success:true,message:"sub added successfully",data:newSub});
            }
        } catch (error) {
            console.log({error})
            res.status(500).send({success:false,message:error.message});
        }


}

module.exports={
    createSubCategory
}