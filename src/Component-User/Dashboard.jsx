import React, { useState } from 'react';
import Product from './Product';
import Category from './Category';
import Header from './Header';

const Dashboard = ({ onAddToCart, cartItemCount }) => {
  const [showProducts, setShowProducts] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowProducts(true);
    setShowCategories(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowProducts(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
      <Header cartItemCount={cartItemCount} onSearch={handleSearch} />
      <div className="flex-1 p-4 ml-64 mt-16">
        <Category 
          showCategories={showCategories}
          onSelectCategory={handleCategorySelect}
        />

        {showProducts && (
          <>
            <h2 className="text-3xl text-center mt-4 font-bold mb-4 text-white">
              {selectedCategory ? `${selectedCategory.name} Products` : 'All Products'}
            </h2>
            <Product 
              categoryId={selectedCategory?.id}
              onAddToCart={onAddToCart}
              searchQuery={searchQuery}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
