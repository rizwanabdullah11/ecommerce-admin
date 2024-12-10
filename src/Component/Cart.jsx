import React from 'react';

const Cart = ({ cartItems, onClose, onCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button 
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Shop
        </button>
      </div>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-4">Quantity: {item.quantity}</span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
            <button 
              onClick={onCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;