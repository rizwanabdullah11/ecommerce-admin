import React from 'react';

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <div 
              className="bg-gray-800 p-2 text-xl rounded cursor-pointer hover:bg-gray-700"
              onClick={() => setActiveView('categories')}
            >
              Categories
            </div>
          </li>
          <li>
            <div 
              className="block p-2 text-xl hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => setActiveView('products')}
            >
              Products
            </div>
          </li>
          <li>
            <div 
              className="block p-2 text-xl hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => setActiveView('orders')}
            >
              Orders
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
