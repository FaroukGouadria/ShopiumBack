const ProductModel = require('../model/ProductModel');

const 
    Category = require('../model/category'),
    // Products = require('../model/productModel'), 
    categoryCtrl = {
        getCategories: async(req, res) =>{
            try {
                const categories = await Category.find()
                res.json(categories)
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
        createCategory: async (req, res) =>{
            try {
                
                const {name} = req.body ;
                const category = await Category.findOne({name})
                if(category) return res.status(400).json({msg: "This category already exists."})
                const newCategory = new Category({name})
                await newCategory.save()
                res.json({success:true,msg: "Created a category",data:newCategory})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
        deleteCategory: async(req, res) =>{
            try {
                await Category.findByIdAndDelete(req.body.id)
                    res.json({msg: "Deleted a Category"})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },
        updateCategory: async(req, res) =>{
            try {
                const {name,products} = req.body;
                await Category.findOneAndUpdate({_id: req.params.id}, {name,products})

                res.json({msg: "Updated a category"})
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        }
        
    };



module.exports = categoryCtrl