

export const Aboutpage = () => {
  return (
   
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Overlay for readability */}

      <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl mb-8">
            We are passionate about providing the best products for our customers. Our mission is to offer high-quality goods at affordable prices, along with excellent customer service.
            Our team is dedicated to ensuring you have the best shopping experience possible. Whether you are browsing or buying, we are here to help you find exactly what you need.
          </p>
          <a href="/product">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300">
              Explore Our Products
            </button>
          </a>
        </div>
      </div>
    </div>

  )
}
