const mongoose = require('mongoose');
const FideliteSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    data:{
        type:String,
        required:true,
        unique:true,    
    },  
    format:{
        type:String,
    },
    magasin:{
        type:String,
    }
});

module.exports = mongoose.model('Fidelite',FideliteSchema);