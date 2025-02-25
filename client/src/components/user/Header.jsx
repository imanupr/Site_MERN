import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../services/userServices";
import { persistor } from "../../redux/store";
import { clearUser } from "../../redux/features/userSlice";
import { FaCartShopping } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
export const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state)=>state.user)
  console.log(userData,"user data")

  const handleLogout = ()=>{
    
    try {
      userLogout().then((res)=>{
        persistor.purge()
        dispatch(clearUser())
        navigate("/")
      })
    } catch (error) {
      console.log(error);
    }
  }
    return (
      <nav className="bg-gray-800 text-white  p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <a href="/">Logo</a>
          </div>
          
          {/* Navbar Links */}
          <div className="hidden md:flex space-x-10">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/about" className="hover:text-gray-200">About</a>
            <a href="/product" className="hover:text-gray-200">Products</a>
            
          </div>
          <div className='hidden md:flex space-x-10'>

          {userData.user && Object.keys(userData.user).length >0 ? <div className='flex items-center space-x-3'>
            <span>Welcome {userData.user.name}</span><button className='cursor-pointer' onClick={ ()=> navigate('cart') }><FaCartShopping className='text-xl'/></button><button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
          </div> : <a href="/login" className="hover:text-gray-200">Login</a>}
          </div>
          
          {/* Hamburger for mobile view */}
          <div className="md:hidden">
            <button className="text-black">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  };
  