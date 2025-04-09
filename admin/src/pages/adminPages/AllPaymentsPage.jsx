import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

export default function AllPaymentsPage() {
  const [search, setSearch] = useState('');
  const [data, isLoading, error] = useFetch('/payment/transaction');

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // e.g. "4/10/2025, 5:30:00 PM"
  };

  const filteredData = data?.data?.filter((payment) => {
    const query = search.toLowerCase();
    return (
      payment.transactionId?.toLowerCase().includes(query) ||
      payment.orderId?.toLowerCase().includes(query) ||
      payment.user?.name?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <div className="p-6 text-gray-700">Loading payments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Payment Transactions</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Transaction ID, Order ID, or User Name"
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Transaction ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Order ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">User Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Amount</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData?.length > 0 ? (
              filteredData.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{payment.orderId}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {payment.user?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">₹{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatDateTime(payment.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
