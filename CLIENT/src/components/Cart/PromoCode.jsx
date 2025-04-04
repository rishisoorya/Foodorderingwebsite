import React, { useState } from 'react';
import UseFetch from '../../hooks/UseFetch.jsx';


const PromoCode = ({ selectedCoupon, setSelectedCoupon }) => {
  const [discount, setDiscount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [data, isLoading, error] = UseFetch("/coupon/get");
  const coupons = data?.coupons || [];

  const handleCouponClick = (code) => {
    setErrorMsg('');
    setSelectedCoupon(selectedCoupon === code ? "" : code); // Toggle selection
  };

  if (isLoading) return <div>Coupon Loading...</div>;
  if (error) {
    console.error("Fetch Error:", error);
    return <p className="text-red-600 text-center">{error.message}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Promo Code</h3>

      {/* Promo Code Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Enter promo code"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-pink-500 focus:border-pink-500"
          value={selectedCoupon}
          onChange={(e) => setSelectedCoupon(e.target.value)} // ✅ Fix: Added onChange
        />
      </div>

      {/* Error Message */}
      {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}

      {/* Discount Message */}
      {discount > 0 && (
        <p className="mt-2 text-sm text-green-600">
          ${discount.toFixed(2)} discount applied!
        </p>
      )}

      {/* Available Coupons */}
      <div className="mt-4">
        <h4 className="text-md font-semibold mb-2">Available Coupons</h4>
        <ul className="space-y-2">
          {coupons
            .filter(coupon => coupon.isAvailable && new Date(coupon.expiryDate) > new Date())
            .map(coupon => (
              <li
                key={coupon._id}
                className={`border p-3 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition ${
                  selectedCoupon === coupon.code ? "bg-green-100 border-green-400" : ""
                }`}
                onClick={() => handleCouponClick(coupon.code)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{coupon.code}</span>
                  <span className="text-sm text-gray-600">
                    {coupon.discountPercentage}% off up to ${coupon.MaxDiscValue}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Min Order: ${coupon.minOrderValue} | Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PromoCode;
