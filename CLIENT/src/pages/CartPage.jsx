import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  // Sample cart data with state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 12.99,
      quantity: 2,
      specialInstructions: "Extra cheese please",
      deliveryTime: "25-35 min",
      restaurant: "Gourmet Paradise"
    },
    {
      id: 2,
      name: "Truffle Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 16.99,
      quantity: 1,
      specialInstructions: "",
      deliveryTime: "25-35 min",
      restaurant: "Gourmet Paradise"
    },
    {
      id: 3,
      name: "Garlic Bread",
      image: "https://images.unsplash.com/photo-1586449480558-33ae22ffc60b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: 5.99,
      quantity: 1,
      specialInstructions: "Extra garlic butter",
      deliveryTime: "25-35 min",
      restaurant: "Gourmet Paradise"
    }
  ]);

  const [deliveryFee] = useState(2.99);
  const [taxRate] = useState(0.08);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax - discount;

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    // In a real app, you would validate the promo code with your backend
    if (promoCode.toLowerCase() === 'foodie20') {
      setDiscount(subtotal * 0.2); // 20% discount
      alert('Promo code applied! 20% discount added.');
    } else {
      alert('Invalid promo code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order from {cartItems[0].restaurant}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Estimated delivery: {cartItems[0].deliveryTime}
                  </p>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4">
                      <div className="flex items-start">
                        <img
                          className="h-20 w-20 rounded-md object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="ml-4 text-base font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                          
                          {item.specialInstructions && (
                            <p className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">Note:</span> {item.specialInstructions}
                            </p>
                          )}
                          
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-pink-600 p-1"
                              >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="mx-2 text-gray-700">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-pink-600 p-1"
                              >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
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
              
              {/* Promo Code */}
              <div className="bg-white shadow rounded-lg overflow-hidden p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-pink-500 focus:border-pink-500"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-pink-600 text-white font-medium rounded-r-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ${discount.toFixed(2)} discount applied!
                  </p>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between py-2 text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-4 border-t border-gray-200 text-base font-medium text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      to="/checkout"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">
                      All prices are in USD. Taxes are estimated.
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-6 bg-white shadow rounded-lg overflow-hidden p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">We Accept</h3>
                <div className="flex space-x-4">
                  <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1.61a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75zm-2.25 4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm-.75 3a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm4.5-7.5a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75z" />
                  </svg>
                  <svg className="h-8 w-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1.61a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75zm-2.25 4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm-.75 3a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm4.5-7.5a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75z" />
                  </svg>
                  <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1.61a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75zm-2.25 4.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm-.75 3a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5zm4.5-7.5a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75v-.75a.75.75 0 0 1 .75-.75z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">
              Start adding some delicious items from our menu!
            </p>
            <div className="mt-6">
              <Link
                to="/restaurants"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Browse Restaurants
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;