import React, { useState } from 'react';
import Category from './Category/Category';
import Product from './Products/Product';
import Orders from './Order';

const Dashboard = ({ activeView, searchQuery, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4">
      {(activeView === 'categories' || !activeView) && (
        <>
          <Category 
            showCategories={true} 
            onSelectCategory={handleCategoryClick}
            searchQuery={searchQuery}
          />
          {selectedCategory && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">{selectedCategory.name} Products</h2>
              <Product 
                categoryId={selectedCategory.id}
                searchQuery={searchQuery}
                onAddToCart={onAddToCart}
              />
            </div>
          )}
        </>
      )}
      {activeView === 'products' && (
        <Product 
          searchQuery={searchQuery}
          onAddToCart={onAddToCart}
        />
      )}
      {activeView === 'orders' && <Orders />}
    </div>
  );
};

export default Dashboard;

