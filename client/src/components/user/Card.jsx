import { toast } from "react-toastify";
import { addToCart } from "../../services/userServices";

const ProductCard = ({ product }) => {

  const addProducttoCart = (productId) => {
    try {
      addToCart(productId).then((res) => {
        console.log(res);
        toast.success(res.data.message);
      }).catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <img className="w-full h-48 object-cover" src={product.image} alt="Product" />

      {/* Product Info */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">
          {product.description}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-800">{product.price}</span>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200" onClick={() => addProducttoCart(product._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
