import React from "react";

function CheckOut() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-6 px-8">
            <h1 className="text-2xl font-bold text-white">Complete Your Order</h1>
            <p className="text-indigo-100 mt-1">Secure payment processing</p>
          </div>

          <div className="p-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="card_number">
                  Card Number
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  id="card_number"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiration_date">
                    Expiration Date
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="expiration_date"
                    type="text"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="cvv"
                    type="text"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-indigo-600 transition-colors"
                  type="button"
                >
                  Pay Now
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex space-x-4">
                <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 38 24">
                  <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#142688"></path>
                  <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                  <path d="M13 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z" fill="#EB001B"></path>
                  <path d="M25 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z" fill="#FF5F00"></path>
                  <path d="M21 12c0 2.2-1.8 4-4 4-1.1 0-2.1-.5-2.7-1.3 1.3-.9 2.2-2.4 2.2-4.1 0-1.7-.9-3.2-2.2-4.1.6-.8 1.6-1.3 2.7-1.3 2.2 0 4 1.8 4 4z" fill="#F79E1B"></path>
                </svg>
                <svg className="h-8 w-auto" viewBox="0 0 38 24" fill="none">
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
  );
}

export default CheckOut;