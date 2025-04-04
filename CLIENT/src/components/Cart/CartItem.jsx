import React, { useEffect, useMemo } from 'react';
import axiosInstance from '../../axios/axiosInstance.js';
import UseFetch from '../../hooks/UseFetch.jsx';



const CartItem = ({ setCartId, setRestaurantId, setItems }) => {
  const [data, isLoading, error, refetch] =UseFetch ("/cart/all");
  const cart = data?.data || {};
  
  // Memoize items to prevent unnecessary effect triggers
  const items = useMemo(() => cart.items || [], [cart.items]);

  useEffect(() => {
    if (cart._id) {
      setCartId(cart._id);
    }
    if (cart.restaurantId) {
      setRestaurantId(cart.restaurantId);
    }
    setItems(items);
  }, [cart._id, cart.restaurantId, items, setCartId, setRestaurantId, setItems]);

  const handleQuantityUpdate = async (foodId, action) => {
    try {
      const response = await axiosInstance.put("/cart/update", { foodId, action });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (foodId) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${foodId}`);

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleDeleteCart = async () => {
    if (!cart._id) {
      console.error("Cart ID is undefined");
      alert("Cart ID not found!");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/cart/delete_cart/${cart._id}`);

      if (response.status === 200) {
        alert("Cart deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
      alert("Failed to delete cart. Please try again.");
    }
  };

  if (isLoading) return <div className="p-4 text-center">Cart loading...</div>;
  if (error) return <p className="p-4 text-center text-red-500">No Items Added To The Cart Or Failed To Fetch Cart</p>;
  if (items.length === 0) return <p className="p-4 text-center">No items added to the cart.</p>;

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Cart Items Section - Full Width */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Your Cart Items</h2>
          <ul className="divide-y divide-gray-200 w-full">
            {items.map((item) => (
              <li key={item._id} className="py-6 w-full">
                <div className="flex items-start">
                  {/* Image container */}
                  <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                    <img
                      src={item.foodImage || '/default-food-image.jpg'} // Add a default image path
                      alt={item.foodName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.foodName}
                      </h3>
                      <p className="ml-4 text-lg font-medium text-gray-900">
                      ₹{item.totalItemPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityUpdate(item.foodId, "decrement")}
                          className="text-gray-500 hover:text-pink-600 p-1 rounded-full hover:bg-gray-100"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="mx-2 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityUpdate(item.foodId, "increment")}
                          className="text-gray-500 hover:text-pink-600 p-1 rounded-full hover:bg-gray-100"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.foodId)}
                        className="text-sm font-medium text-pink-600 hover:text-pink-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary Section - Full Width */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{cart.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                  ₹{cart.finalPrice?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
            </div>

            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;