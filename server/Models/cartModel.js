const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'users',
        required: true
    },
    products:[
        {
            productId:{
                type: mongoose.Types.ObjectId,
                ref:'products',
                required: true 
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    }
})

cartSchema.methods.calculateTotalPrice = function (){
    this.totalPrice = this.products.reduce((total,product)=>total + product.price, 0)
}

module.exports = new mongoose.model('carts',cartSchema)