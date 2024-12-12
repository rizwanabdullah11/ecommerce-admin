import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = ({ onSearch }) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="fixed w-full top-0 bg-gray-800 shadow-md">
      <nav className="container mx-auto py-5">
        <div className="flex items-center ml-64">
          <Link to="/" className="text-3xl font-bold text-white hover:text-blue-600">
            MyStore
          </Link>
          <div className="flex-1 ml-32 mr-16">
            <input 
              type="text" 
              placeholder="Search..." 
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mr-48 items-center">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="h-6 w-6 text-white hover:text-blue-800" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
