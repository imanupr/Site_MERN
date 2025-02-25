import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignUp } from "../../services/userServices";
import { toast } from "react-toastify";

export const SignupPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate()
  const onSubmit = (e) => {
    userSignUp(values).then((res)=>{
      console.log(res);
      toast.success("Registered Successfully")
      navigate("/")
    }).catch(err =>{
      console.log(err,"error")
      toast.error(err.message )})
    e.preventDefault(); // Prevent default form submission behavior
    console.log(values, "values");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      /*style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }}*/
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>{" "}
      {/* Overlay for readability */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
        {/* Hero Section */}
        <div className="max-w-2xl px-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Create an Account
          </h1>
          <p className="text-base md:text-lg mb-6">
            Sign up today and start shopping with us!
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
            Sign Up
          </h2>

          <form action="#" method="POST" onSubmit={onSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-gray-600 font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={values.name}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) => { setValues({ ...values, [e.target.name]: e.target.value }) }
                } />
            </div>

            {/* Phone Number Input */}
            <div className="mb-3">
              <label
                htmlFor="phone"
                className="block text-gray-600 font-medium mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={values.phone} // Add value here
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) =>{
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={values.password} // Add value here
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) =>{
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmpassword"
                placeholder="Confirm your password"
                value={values.confirmPassword} // Add value here
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                onChange={(e) =>{
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 transition duration-300"
                onClick={onSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already have an account? Login link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
