import React from 'react';
const Navbar = ({ onSearch }) => {
  return (
    <div className="fixed w-full bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-semibold">E-Commerce Admin</span>
        </div>
        <div className="flex-1 max-w-lg w-96 mr-4">
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
