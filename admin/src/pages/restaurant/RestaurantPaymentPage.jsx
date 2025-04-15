import React from "react";
import useFetch from "../../hooks/useFetch";

function RestaurantPaymentPage() {
  const [data, isLoading, error] = useFetch("/payment/all/transaction");

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg text-gray-600">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl text-red-600">Error loading payments</h2>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-pink-50 p-8 md:p-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Payment Transactions
          </h1>
          <p className="text-lg text-gray-600">
            View all payment transactions for your restaurant
          </p>
        </div>
      </div>

      {/* Payments List */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {data && data.message === "Payments fetched successfully" ? (
          <div className="space-y-6">
            {data.data.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        ₹{payment.amount}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          ({payment.orderId})
                        </span>
                      </h3>
                      <p className="text-gray-600">
                        <span className="font-medium">Customer:</span>{" "}
                        {payment.user ? payment.user.name : "Guest"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {payment.createdAt && (
                    <p className="mt-4 text-sm text-gray-500">
                      Processed on: {new Date(payment.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-pink-50 inline-block p-6 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No payments found
            </h3>
            <p className="text-gray-600">
              There are no payment transactions to display at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantPaymentPage;