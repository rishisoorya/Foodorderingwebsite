import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem.jsx";
import PromoCode from "../components/Cart/PromoCode.jsx";
import EmptyCart from "../components/cart/EmptyCart.jsx";
import ShowAddress from "../components/Cart/ShowAddress.jsx";
import axiosInstance from "../axios/axiosInstance.js"; 

const CartPage = () => {
  const [cartId, setCartId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    setError("");

    if (!cartId || !selectedAddressId || !restaurantId) {
      console.log("Missing cartId, restaurantId, or selectedAddressId");
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
      console.log("Response received:", response);

      if (response.status === 200 || response.status === 201) {
        setShowAlert(true);
        toast.success("Order has been placed successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      setError("Failed to place order. Please try again.");
      toast.error("Failed to place order. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
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
console.log(selectedCoupon)
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer /> {/* Add this inside your component */}
      <div className="w-full px-4 sm:px-6 py-8">
        <div className="max-w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

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
            className="px-5 py-2 rounded-3 fw-bold shadow-lg bg-yellow-500 text-white"
            onClick={handleCheckout}
            disabled={loading}
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
