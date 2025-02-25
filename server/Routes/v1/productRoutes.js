const { create, listProducts, productDetails, updateProduct, deleteProduct } = require('../../Controllers/productController');
const authAdmin = require('../../Middlewares/authAdmin');
const upload = require('../../Middlewares/multer')

const productRouter = require('express').Router()


productRouter.post("/create",authAdmin,upload.single('image'),create)
productRouter.get("/listproducts",listProducts)
productRouter.get("/productdetails/:productId",productDetails)
productRouter.put("/update/:productId",authAdmin,upload.single('image'),updateProduct)
productRouter.delete("/delete/:productId",authAdmin,deleteProduct)
module.exports = productRouter;