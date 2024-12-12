import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../Redux/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 p-8">
      <div className="flex justify-between items-center mb-4 ml-16 mr-16">
        <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Shop
        </button>
      </div>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-white text-xl">Your cart is empty</p>
      ) : (
        <div className="space-y-4 ml-16 mr-16">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-white">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white">Quantity: {item.quantity}</span>
                <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <h3 className="text-xl text-white font-bold">Total: ${totalAmount.toFixed(2)}</h3>
            <div className="space-x-4">
              <button 
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
