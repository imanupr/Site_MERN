const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModel");



const getCart = async (req,res)=>{
    try {
        
        const userId = req.user
        const cart = await cartModel.findOne({userId}).populate("products.productId")
        if(!cart){
            return res.status(400).json({error:"Cart is empty"})
        }

        res.status(200).json({cart})
    } catch (error) {
        console.log(error);
        res.status(error.status|| 500).json({error: error.message||"Internal Error"})
    }
}

const addToCart = async (req,res)=>{
    try {
        const userId = req.user;    
        const {productId}= req.params

        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({error: "product not found" })
        }

        let cart = await cartModel.findOne({userId})

        if(!cart){
            cart = new cartModel({ userId,products:[]})
        }

        const productAlreadyExist = cart.products.some((item)=>item.productId.equals(productId))
        if(productAlreadyExist){
            return res.status(400).json({error: "Product already in cart"})
        }

        cart.products.push({
            productId,
            price: product.price
    })

    cart.calculateTotalPrice()
    await cart.save()
    res.status(200).json({message:"Added to Cart", cart})


    } catch (error) {
        console.log(error);
        res.status(error.status|| 500).json({error: error.message||"Internal Error"})
    }
}

const removeFromCart = async (req,res)=>{
    try {
        
        const userId= req.user;
        const {productId}= req.params;

        let cart= await cartModel.findOne({userId})
        if(!cart){
            return res.status(400).json({error: "cart not found"})
        }

        cart.products = cart.products.filter((item)=> !item.productId.equals(productId))
        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({message:"Product removed from Cart",cart})
    } catch (error) {
        console.log(error);
        res.status(error.status|| 500).json({error: error.message||"Internal Error"})
    }
}


const clearCart = async (req,res)=>{
    try {

        const userId= req.user;
        const cart = await cartModel.findOne({userId})

        if(!cart){
            return res.status(404).json({error:"Cart not found"})
        }

    cart.products =[]

    await cart.save();
    return res.status(200).json({message:'Cart cleared'})
        
    } catch (error) {
        console.log(error);
        res.status(error.status|| 500).json({error: error.message||"Internal Error"})
    }
}
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
}