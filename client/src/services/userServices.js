
import { axiosInstance } from "../axios/axiosInstance";


export const listProducts = ()=>{
    return axiosInstance.get("/products/listproducts")
}


export const userSignUp =(data)=>{
    return axiosInstance.post("/user/register",data)
}

export const userLogin =(data)=>{
    return axiosInstance.post("/user/login",data)
}

export const userLogout =()=>{
    return axiosInstance.post("/user/logout")
}

export const addToCart =(productId)=>{
    return axiosInstance.post(`/cart/addtocart/${productId}`)
}

export const getCartItems =()=>{
    return axiosInstance.get("/cart/getcart")
}

export const removeCartItem =(productId)=>{
    return axiosInstance.delete(`/cart/removefromcart/${productId}`)
}

export const makepaymentOnStripe =(body)=>{
    return axiosInstance.post('/payment/makepayment',body)
}

export const clearCartItems =()=>{
    return axiosInstance.post('/cart/clearcart')
}