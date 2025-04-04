import React from 'react';
import useFetch from '../hooks/useFetch';

export default function UserProfilePage() {
  const [userData, isUserLoading, userError] = useFetch("/user/profile");
  const [addressData, isAddressLoading, addressError] = useFetch("/address/get/getAllAddress");
  const [ordersData, isOrdersLoading, ordersError] = useFetch("/order/get/all");

  const profile = userData?.user || {};
  const address = addressData?.address || null;
  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];

  if (isUserLoading || isAddressLoading || isOrdersLoading) {
    return <div className="text-center py-8">Loading user data...</div>;
  }

  if (userError || addressError || ordersError) {
    return <div className="text-center py-8 text-red-500">
      Error loading user data. Please try again later.
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={profile.profilePic || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Member Since</p>
                <p className="font-medium">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      {address && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Default Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{address.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{address.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-medium">
                {address.houseName}, {address.streetName}
              </p>
              <p className="font-medium">
                {address.landmark}, {address.city}
              </p>
              <p className="font-medium">
                {address.state} - {address.pincode}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-2">Restaurant: {order.restaurant.name}</p>
                  <ul className="space-y-2">
                    {order.cartId.items.map(item => (
                      <li key={item._id} className="flex justify-between">
                        <span>{item.quantity} x {item.foodName}</span>
                        <span>₹{item.totalItemPrice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  {order.coupon && (
                    <div className="flex justify-between mb-1 text-green-600">
                      <span>Discount ({order.coupon.discountPercentage}%):</span>
                      <span>-₹{order.totalAmount - order.finalPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{order.finalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}