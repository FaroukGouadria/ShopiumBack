const Category = require('../model/category')
const ProductModel = require('../model/ProductModel')
const Products = require('../model/ProductModel')
const { updateCategory } = require('./category')
 
const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            const products = await Products.find() 
 
 
            res.json({
                status: 'success',
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            const { name, price ,barcode ,categoryId} = req.body;
            console.log({categoryId});
            const categories = await Category.findOne({categoryId});
            console.log({'categories':categories});
            if(!categories) return res.send({success:false,msg:'category not found ! '});
            const product = await Products.findOne({name:name})
            if(product)
                return res.status(400).json({msg: "This product already exists."})

            const newProduct = new Products({
                name: name.toLowerCase(), price,barcode,
                categoryId:categoryId
            });

            await newProduct.save();
            //////////////////////////////// relation one To Many
            await Category.updateMany({'id':newProduct.categoryId},{$push:{products:newProduct._id}})
            ///////////////////////////////
            res.json({success:true,msg: "Created a product",data:newProduct})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const { name, price  , category} = req.body;
 
            await Products.findOneAndUpdate({_id: req.params.id}, {
                name: name.toLowerCase(), price, category
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addProduct:async(req,res)=>{
        try {
            var arrayImages =[];
            for (let index = 0; index < req.files.length; index++) {
                arrayImages[index]=req.files[index].filename;
            }
             const { name, price ,barcode ,categoryId} = req.body;
            console.log({categoryId});
            const categories = await Category.findOne({categoryId});
            console.log({'categories':categories});
            if(!categories) return res.send({success:false,msg:'category not found ! '});
            const product = await Products.findOne({name:name})
            if(product)
                return res.status(400).json({msg: "This product already exists."})
    
            const newProduct = new Products({
                name: name.toLowerCase(), price,barcode,
                categoryId:categoryId,
                photo:arrayImages
            });
    
            await newProduct.save();
            //////////////////////////////// relation one To Many
            await Category.updateMany({'id':newProduct.categoryId},{$push:{products:newProduct._id}})
            ///////////////////////////////
            res.json({success:true,msg: "Created a product",data:newProduct})
        } catch (error) {
            res.status(400).send({success:false,msg:error.message});
        }
    }
}



module.exports = productCtrl