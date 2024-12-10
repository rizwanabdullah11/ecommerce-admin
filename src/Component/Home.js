import React, { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Checkout from './Checkout';
import AdminDashboard from '../Admin/adminPanel';

const Home = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = (customerInfo) => {
    const newOrder = {
      id: Date.now(),
      customerInfo,
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setCurrentView('adminDashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'dashboard' && (
        <>
          <Navbar 
            onSearch={setSearchQuery} 
            cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
            onCartClick={() => setCurrentView('cart')}
          />
          <Dashboard 
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
          />
        </>
      )}
      {currentView === 'cart' && (
        <Cart 
          cartItems={cartItems} 
          onClose={() => setCurrentView('dashboard')}
          onCheckout={() => setCurrentView('checkout')}
        />
      )}
      {currentView === 'checkout' && (
        <Checkout 
          onSubmit={handleCheckout}
          onCancel={() => setCurrentView('cart')}
        />
      )}
      {currentView === 'adminDashboard' && (
        <AdminDashboard 
          orders={orders}
          onClose={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
};

export default Home;