import React, { useState } from 'react';
import Update from './Update';

const AdminDashboard = ({ orders, onClose, onUpdateOrder, onDeleteOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localOrders, setLocalOrders] = useState(orders);

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = (orderId) => {
    const updatedOrders = localOrders.filter(order => order.id !== orderId);
    setLocalOrders(updatedOrders);
    onDeleteOrder(orderId);
  };

  const handleUpdate = (updatedOrder) => {
    const updatedOrders = localOrders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setLocalOrders(updatedOrders);
    onUpdateOrder(updatedOrder);
    setSelectedOrder(null);
  };

  const handleAdd = () => {
    console.log('Adding new order');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="flex justify-between mb-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back to Store
          </button>
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add New Order
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customerInfo.name}</td>
                  <td className="px-4 py-2">{order.customerInfo.address}</td>
                  <td className="px-4 py-2">{order.customerInfo.phoneNumber}</td>
                  <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleEdit(order)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <Update
          order={selectedOrder}
          onUpdate={handleUpdate}
          onCancel={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;