const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Favorite',FavoriteSchema);