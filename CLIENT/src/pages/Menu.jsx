import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios/axiosInstance.js";
import UseFetch from "../hooks/UseFetch.jsx";


const MenuPage = () => {
  let { id } = useParams();
  const [data, isLoading, error] = UseFetch(`/restaurant/id/${id}`);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(""); // Renamed to avoid conflict with useFetch error
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Initialize cart with default values
  const [cart, setCart] = useState({
    foodId: "",
    restaurantId: "",
    quantity: 1,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading menu...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!data?.findRestaurant) {
    return <div className="text-center py-8">Restaurant not found</div>;
  }

  const restaurant = data.findRestaurant;
  const hasMenuItems = restaurant.menu?.length > 0;

  const handleAddToCart = async (item) => {
    setLocalError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/cart/item", {
        foodId: item._id,
        restaurantId: restaurant._id,
        quantity: 1,
      });
      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      setLocalError(
        "Failed to add item to cart. Please check if any item from a different restaurant is already in your cart."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Item added to cart successfully!
        </div>
      )}

      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                restaurant.openStatus
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {restaurant.openStatus ? "Open Now" : "Closed"}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">{restaurant.email}</p>
            <p className="text-gray-600">{restaurant.phone}</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Menu</h2>

        {/* Error Message */}
        {localError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {localError}
          </div>
        )}

        {hasMenuItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurant.menu.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <button
                    variant="warning"
                    className="w-full px-4 add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add To Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No menu items available
            </h3>
            <p className="mt-1 text-gray-500">
              This restaurant hasn't added any items to their menu yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;