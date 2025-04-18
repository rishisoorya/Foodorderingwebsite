import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Cart/CartItem.jsx";
import PromoCode from "../components/Cart/PromoCode.jsx";
import ShowAddress from "../components/Cart/ShowAddress.jsx";
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
        toast.success("Order placed successfully! Redirecting to payment...");
      } else {
        setError("Unexpected server response. Please try again.");
      }
    } catch (error) {
      setError("Failed to place order. Please try again.");
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        navigate("/pages/paymentPage", { replace: true });
      }, 2000);
    }
  }, [showAlert, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-600 mb-3">Your Cart</h1>
          <p className="text-lg text-pink-500">Review your items before checkout</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Your Items</h2>
                </div>
                <CartItem
                  setCartId={setCartId}
                  setRestaurantId={setRestaurantId}
                  setItems={setItems}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Promo Code</h2>
                </div>
                <PromoCode
                  selectedCoupon={selectedCoupon}
                  setSelectedCoupon={setSelectedCoupon}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Delivery Address</h2>
                </div>
                <ShowAddress
                  selectedAddressId={selectedAddressId}
                  setSelectedAddressId={setSelectedAddressId}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden p-6">
              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading || !cartId || !selectedAddressId}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] ${
                    loading || !cartId || !selectedAddressId
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-pink-600 hover:bg-pink-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Secure Checkout
                    </span>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-pink-100">
                  <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 38 24">
                    <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#142688"></path>
                    <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                    <path d="M13 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z" fill="#EB001B"></path>
                    <path d="M25 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z" fill="#FF5F00"></path>
                    <path d="M21 12c0 2.2-1.8 4-4 4-1.1 0-2.1-.5-2.7-1.3 1.3-.9 2.2-2.4 2.2-4.1 0-1.7-.9-3.2-2.2-4.1.6-.8 1.6-1.3 2.7-1.3 2.2 0 4 1.8 4 4z" fill="#F79E1B"></path>
                  </svg>
                  <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none">
                    <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#222"></path>
                    <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#fff"></path>
                    <path d="M11 17H9.4v-6.2H11v6.2zm-1-7c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7s.7.3.7.7c0 .4-.3.7-.7.7zm7 7h-1.6v-3.3c0-.8 0-1.4-.4-1.7-.4-.4-1-.4-1.6-.4-.5 0-1 .1-1.4.3V10h1.6v2.2c.3-.1.6-.2.9-.2.3 0 .5.1.6.2.1.2.2.5.2 1.1V17h-1.6v-3.4c0-.4 0-.7-.1-.9 0-.2-.2-.3-.3-.3-.2 0-.4.1-.5.3-.1.2-.2.5-.2.9V17H7v-6.2h1.6v.9c.5-.7 1.2-1 2.1-1 .7 0 1.3.2 1.7.6.4.4.6 1 .6 1.7V17zm5-3.3c0 1.3-.4 2.3-1.2 3-.8.7-1.8 1-3 1h-3.2V7h3c1.2 0 2.2.3 3 1 .8.7 1.2 1.7 1.2 3v.7zm-1.6-.7c0-1-.2-1.7-.7-2.2-.5-.5-1.2-.7-2.1-.7h-1.4v6.2h1.4c.9 0 1.6-.2 2.1-.7.5-.5.7-1.2.7-2.2v-.4zm9.2.7c0 1.3-.4 2.3-1.2 3-.8.7-1.8 1-3 1h-3.2V7h3c1.2 0 2.2.3 3 1 .8.7 1.2 1.7 1.2 3v.7zm-1.6-.7c0-1-.2-1.7-.7-2.2-.5-.5-1.2-.7-2.1-.7h-1.4v6.2h1.4c.9 0 1.6-.2 2.1-.7.5-.5.7-1.2.7-2.2v-.4z" fill="#222"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;