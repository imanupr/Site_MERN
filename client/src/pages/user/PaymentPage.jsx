import { useEffect } from "react";
import { clearCartItems } from "../../services/userServices";

 const PaymentSuccess = () => {

    useEffect(()=>{
        clearCartItems().then((res)=>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
            
        })
    },[])
    return (
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Overlay for readability */}
  
        <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white">
          <div className="max-w-3xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Successful</h1>
            <p className="text-lg md:text-xl mb-8">
              Thank you for your purchase! Your payment has been successfully processed. 
              You will receive a confirmation email with your order details shortly. 
              We appreciate your business and look forward to serving you again soon.
            </p>
            <a href="/">
              <button className="bg-green-500 text-white py-3 px-6 rounded-full text-lg hover:bg-green-600 transition duration-300">
                Go to Home
              </button>
            </a>
          </div>
        </div>
      </div>
    )
  };

  export default PaymentSuccess;
  