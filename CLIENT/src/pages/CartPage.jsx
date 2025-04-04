import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import PromoCode from "../components/Cart/PromoCode.jsx";
import EmptyCart from "../components/cart/EmptyCart.jsx";
import ShowAddress from "../components/Cart/ShowAddress.jsx";
import CartItem from "../components/Cart/CartItem.jsx"; // Add missing import
import axiosInstance from "../axios/axiosInstance.js"; 

const CartPage = () => {
  const [cartId, setCartId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError("");

    if (!cartId || !selectedAddressId || !restaurantId) {
      setError("Please select an address and add items to the cart.");
      toast.error("Please select an address and add items to the cart.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    const requestBody = {
      restaurant: restaurantId,
      cartId: cartId,
      coupon: selectedCoupon || "",
      deliveryAddress: selectedAddressId,
    };

    try {
      const response = await axiosInstance.post("/order/update", requestBody);

      if (response.status === 200 || response.status === 201) {
        setShowAlert(true);
        toast.success("Order has been placed successfully!", {
          position: "top-right",
          autoClose: 1500, // Reduced from 2000 to 1500
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      } else {
        setError("Unexpected response from server. Please try again.");
        toast.error("Unexpected response from server. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to place order. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        navigate("/pages/paymentPage", { replace: true });
      }, 1500); // Reduced from 2000 to 1500
      return () => clearTimeout(timer);
    }
  }, [showAlert]); // Removed navigate from dependencies as it's stable

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="max-w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col">
            <div className="w-full">
              <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order from {restaurantId || "Select a Restaurant"}
                  </h2>
                </div>

                <CartItem 
                  setCartId={setCartId} 
                  setRestaurantId={setRestaurantId} 
                  setItems={setItems}
                />
              </div>

              <PromoCode 
                selectedCoupon={selectedCoupon} 
                setSelectedCoupon={setSelectedCoupon} 
              />
            </div>
          </div>

          <div>
            <ShowAddress 
              selectedAddressId={selectedAddressId} 
              setSelectedAddressId={setSelectedAddressId} 
            />
          </div>

          <button
            className={`px-5 py-2 rounded-3 fw-bold shadow-lg ${
              loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white transition-colors`}
            onClick={handleCheckout}
            disabled={loading || !cartId}
          >
            {loading ? "Processing..." : "Check Out"}
          </button>

          {!cartId && <EmptyCart />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;