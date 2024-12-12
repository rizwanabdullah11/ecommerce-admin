import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from '../Redux/checkoutSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.checkout.orders);
  console.log(orders);
  

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-500';
      case 'On the way': return 'text-blue-500';
      case 'Delivered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Order #{order.orderNumber}</h3>
                {/* <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p> */}
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="On the way">On the way</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <span className={`font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <p>Name: {order.customerInfo.name}</p>
                <p>Email: {order.customerInfo.email}</p>
                <p>Phone: {order.customerInfo.phoneNumber}</p>
                <p>Address: {order.customerInfo.address}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b py-2">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p>Quantity: {item.quantity}</p>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <p className="text-xl font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
