import React, { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [activeView, setActiveView] = useState('categories');

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        onSearch={setSearchQuery} 
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
      />
      <div className="flex">
        <Sidebar setActiveView={setActiveView} />
        <div className="flex-1 ml-64 mt-16">
          <Dashboard 
            activeView={activeView}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
