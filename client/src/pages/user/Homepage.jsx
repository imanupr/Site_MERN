

export const Homepage = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "" }}>
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Overlay for readability */}

    <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover a wide range of amazing products at the best prices.
        </p>
        <a href="/product">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300">
            Show Products
          </button>
        </a>
      </div>
    </div>
  </div>
  )
}

export default Homepage;