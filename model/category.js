const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product',
    }],
}, {
    timestamps: true
})

module.exports  = mongoose.model("Category", categorySchema)