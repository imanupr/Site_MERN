
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../../services/userServices"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { saveUser } from "../../redux/features/userSlice"
export const LoginPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email:'',
    password:'',
  })


  const onSubmit= (e)=>{
    e.preventDefault();

    userLogin(values).then((res)=>{
      console.log(res)
      toast.success("Login Successfully")
      dispatch(saveUser(res.data.userExist))
      navigate("/")

    }).catch((err)=>{
      toast.error(err.response.data.error)

    })
  }
  return (
  

  
    <div className="relative w-full h-screen bg-cover bg-center" 
    style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Overlay for readability */}

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
        {/* Hero Section */}
        <div className="max-w-2xl px-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg md:text-xl mb-8">
            Discover amazing products at unbeatable prices. Join us and start shopping today!
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          <form action="#" method="POST" onSubmit={onSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-full w-full hover:bg-blue-600 transition duration-300"
                onClick={onSubmit}>
                Login
              </button>
            </div>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Not registered yet?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>





  )
}
