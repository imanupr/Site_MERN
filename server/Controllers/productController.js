const { image } = require("../config/cloudinary")
const productModel = require("../Models/productModel")
const uploadToCloudinary = require("../Utilities/imageUpload")

const create = async (req,res)=>{

    

    try {

        const {title,description,price,}=req.body
        
        if (!title||!description||!price){
            return res.status(400).json({error:"All fields are required"})
        }

        if(!req.file){
            return res.status(400).json({error:"Image not founds"})
        }

        const cloudinaryRes = await uploadToCloudinary(req.file.path)

        const newProduct = new productModel({
            title,
            description,
            price,
            image:cloudinaryRes
        })

        let savedProduct = await newProduct.save()

        if(savedProduct){
            return res.status(200).json({message:"product added ",savedProduct})
        }
    } catch (error) {
        console.log (error);
        res.status(error.status|| 500).json({error:error.message||"Internal Server Error"})
    }
}


const listProducts = async (req,res)=>{
    try {

        const productList = await productModel.find();
         res.status(200).json(productList)
        
    } catch (error) {
        console.log (error);
        res.status(error.status|| 500).json({error:error.message||"Internal Server Error"})
    }
}


const productDetails = async (req,res)=>{
    try {


        const {productId}=req.params;

        const productDetails = await productModel.findById({_id: productId})

        if(!productDetails){
            return res.status(400).json({error:"product not found"})
        }

        return res.status(200).json(productDetails)
        
    } catch (error) {
        console.log (error);
        res.status(error.status|| 500).json({error:error.message||"Internal Server Error"})
    }
}

    const updateProduct =async (req,res)=>{
        try {
            
            const {productId}= req.params;
            const {title,description,price}=req.body;
            let imageUrl;
            let isProductExist = await productModel.findById(productId)

            if(!isProductExist){
                return res.status(400).json({error:"Product not found"})
            }

            if(req.file){
                const cloudinaryRes = await uploadToCloudinary(req.file.path)
                imageUrl = cloudinaryRes;
            }


            const updatedProduct = await productModel.findByIdAndUpdate(productId,{title,description,price,image:imageUrl},{new:true})
            res.json({message:"Product updated",updatedProduct})
        
        } catch (error) {
            console.log (error);
            res.status(error.status|| 500).json({error:error.message||"Internal Server Error"})
        }
    }


const deleteProduct = async (req,res)=>{
    try {
        const {productId}=req.params;
        const productDelete = await productModel.findByIdAndDelete(productId)

        if(!productDelete){
            return res.status(400).json({error:"Product Not Found"})

        }

        res.status(200).json({message:"Product Removed"})

        
    } catch (error) {
        console.log (error);
        res.status(error.status|| 500).json({error:error.message||"Internal Server Error"})
    }
}

module.exports = {
    create,listProducts,productDetails,updateProduct,deleteProduct
}