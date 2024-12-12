import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../Redux/checkoutSlice';
import { clearCart } from '../Redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      customerInfo,
      items: cartItems,
      totalAmount,
      date: new Date().toISOString()
    };

    dispatch(createOrder(orderData));
    dispatch(clearCart());

    toast.info('Order Status: Order Completed!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Checkout</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={customerInfo.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="pt-4">
            <h3 className="text-white font-bold mb-2">Order Summary</h3>
            <p className="text-white">Total Items: {cartItems.length}</p>
            <p className="text-white">Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
