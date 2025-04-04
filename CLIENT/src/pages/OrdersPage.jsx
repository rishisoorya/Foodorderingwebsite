import React from 'react';
import UseFetch from '../hooks/UseFetch.jsx'; 

const OrdersPage = () => {
  const [data, isLoading, error] = UseFetch("/order/get/all");
  const orders = data?.orders || [];

  if (isLoading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <div className="loader"></div>
    </div>
  );

  if (error) {
    console.error("Fetch Error:", error);
    return <p className="text-danger text-center">No Order Found or {error.message}</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Order Management</h1>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>
                    <div>
                      <strong>{order.user.name}</strong>
                      <div className="text-muted small">{order.user.email}</div>
                      <div className="text-muted small">{order.user.phone}</div>
                    </div>
                  </td>
                  <td>{order.restaurant.name}</td>
                  <td>
                    <div className="d-flex flex-column">
                      {order.cartId.items.map(item => (
                        <div key={item._id} className="mb-2 d-flex align-items-center">
                          <img 
                            src={item.foodImage} 
                            alt={item.foodName} 
                            className="rounded mr-2" 
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <div>
                            {item.foodName} × {item.quantity}
                            <div className="text-muted small">₹{item.totalItemPrice}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div>Total: ₹{order.totalAmount}</div>
                      {order.coupon && (
                        <div className="text-success small">Discount applied</div>
                      )}
                      <div className="font-weight-bold">Final: ₹{order.finalPrice}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      order.status === 'pending' ? 'badge-warning' :
                      order.status === 'completed' ? 'badge-success' :
                      order.status === 'cancelled' ? 'badge-danger' : 'badge-secondary'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                    <div className="text-muted small">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary mr-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;