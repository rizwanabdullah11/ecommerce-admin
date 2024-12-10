import React, { useState } from 'react';
import Product from './Products/Product';
import Sidebar from './Sidebar';
import Category from './Category/Category';

const Dashboard = ({ searchQuery, onAddToCart }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowProducts(true);
    setShowCategories(false);
  };

  return (
    <div className="flex">
      <Sidebar 
        setShowProducts={() => setShowProducts(true)}
        onSelectCategory={handleCategorySelect}
        setShowCategories={setShowCategories}
      />
      <div className="flex-1 p-4 ml-64 mt-16">
        <Category 
          showCategories={showCategories}
          onSelectCategory={handleCategorySelect}
          searchQuery={searchQuery}
        />

        {showProducts && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory ? `${selectedCategory.name} Products` : 'All Products'}
            </h2>
            <Product 
              categoryId={selectedCategory?.id}
              searchQuery={searchQuery}
              onAddToCart={onAddToCart}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
