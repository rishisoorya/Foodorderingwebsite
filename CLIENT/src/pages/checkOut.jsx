import React from "react";
function checkOut(){
    return(
        <div className="container mx-auto p4-10">
  <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl">
    <div className="md:flex">
      <div className="w-full px-6 py-8 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        <p className="mt-4 text-gray-600">
          Please fill out the form below to complete your purchase.
        </p>
        <form className="mt-6">
          <div className="mb-6">
            <label
              className="block text-gray-800 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="johndoe@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 font-bold mb-2"
              htmlFor="card_number"
            >
              Card Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="card_number"
              type="text"
              placeholder="**** **** **** 1234"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 font-bold mb-2"
              htmlFor="expiration_date"
            >
              Expiration Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiration_date"
              type="text"
              placeholder="MM / YY"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="text"
              placeholder="***"
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

    )
}
export default checkOut;