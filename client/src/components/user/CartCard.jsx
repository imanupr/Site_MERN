import { removeCartItem } from "../../services/userServices";

export const CartCard = ({ item, updateCartFromChild }) => {

    const removeItem = (productId)=>{
        try {
            removeCartItem(productId).then((res)=>{
                console.log(res);
                updateCartFromChild(productId,res.data.cart.totalPrice)
            }).catch((err)=>{
                console.log(err);
            })
        } catch (error){
            console.log(error);
        }
    }
    return (
        <div className='bg-grey-100 shadow-xl flex items-center justify-between w-full p-5'>
            <figure className="flex-shrink-0">
                <img
                    src={item.productId.image}
                    alt="Shoes" 
                    className="h-[100px] w-[100px] object-cover"
                />
            </figure>

            <div className="flex-grow mx-4">
                <p className="text-sm">PRICE: {item.price}</p>
            </div>

            <div className="card-actions flex-shrink-0">
                <button onClick={()=>removeItem(item.productId._id)} className="btn btn-primary bg-red-500 text-black rounded cursor-pointer px-4 py-2">
                    Delete
                </button>
            </div>
        </div>
    );
};
