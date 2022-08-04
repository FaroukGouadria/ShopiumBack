const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
   magasin:{
    type:String,
   },
   Product:{
    type:[{pname:String,pquantity:Number,ptotal:Number,pupri:Number}]    
},
    dateAchat:{
    type:String
    },
    prixTotal:{
        type:Number
    },
    dateScan:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('TicketModel',ticketSchema);