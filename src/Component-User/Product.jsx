import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Redux/cartSlice';

const Product = ({ categoryId, searchQuery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  const filteredProducts = categoryId 
    ? products.filter(product => 
        product.categoryId === categoryId &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : products.filter(product => 
        !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <h2 className="text-xl font-semibold text-white">No products found</h2>
        </div>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <p className="text-blue-600 font-semibold text-lg mb-4">${product.price}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
