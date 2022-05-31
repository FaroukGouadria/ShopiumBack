const mongoose = require('mongoose');
const subCategorySchema = mongoose.Schema({
    categoryId:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
        unique:true,
    },
});

module.exports = mongoose.model('SubCategory',subCategorySchema);
