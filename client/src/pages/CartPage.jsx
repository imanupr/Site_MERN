
import { useEffect, useState } from 'react'
import { CartCard } from '../components/user/CartCard'
import { getCartItems, makepaymentOnStripe } from '../services/userServices'
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE)
export const CartPage = () => {
    const [cartItems, setCartitems] = useState([]);
    const [total,setTotal]= useState(0)
    const navigate = useNavigate();

    const updateCartFromChild = (id,totalPrice)=>{
        setCartitems((prev) => prev.filter(item=>item.productId._id != id))
        setTotal(totalPrice)
    }

    function EmptyCart(){
        return (
            <div className="flex items-center space-x-4">
            <p>Cart is empty</p>
            <button onClick={() => navigate("/product")} className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300">
              Show Products
            </button>
          </div>
          
        )
            
        
    }

    const  makePayment= async ()=>{
        const body = {
            products: cartItems
        }

        const response = await makepaymentOnStripe(body)
        console.log(response.data.sessionId,"stripe")

        const session = response.data.sessionId

        const stripe = await stripePromise

        if(stripe){
            const result = await stripe.redirectToCheckout({
                sessionId:session
            })

            if(result.error){
                console.log(result.error.message);
            }
        }else {
            console.log('Stripe failed to load');
            
        }

    }
    useEffect(() => {   
        getCartItems()
            .then((res) => {
                console.log(res.data.cart.products);
                setCartitems(res.data.cart.products);
                setTotal(res.data.cart.totalPrice)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="h-screen flex justify-center items-center">
                    <EmptyCart />
                </div>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <CartCard key={index} item={item} updateCartFromChild={updateCartFromChild} />
                    ))}
                    <div className="h-screen flex justify-center items-center">
                        <p>TOTAL PRICE: {total}</p>
                        <button onClick={makePayment} className="btn btn-primary bg-green-500 text-white rounded cursor-pointer px-4 py-2 flex justify-center items-center">
                            Check Out
                        </button>
                    </div>
                </>
            )}
        </>
    );
    
};
