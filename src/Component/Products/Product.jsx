import React, { useState } from 'react';
import ProductModal from './Modal/modal';
const Product = ({ categoryId, searchQuery, onAddToCart }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      image: "https://via.placeholder.com/150",
      categoryId: 1
    },
    {
      id: 2,
      name: "Product 2", 
      price: 149.99,
      image: "https://via.placeholder.com/150",
      categoryId: 2
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([{
      id: Date.now(),
      categoryId,
      ...newProduct
    }, ...products]);
    setIsModalOpen(false);
  };

  const handleAddToCartClick = (product) => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    }
  };

  const filteredProducts = products.filter(product => 
    product?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '') &&
    (!categoryId || product.categoryId === categoryId)
  );

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-500 mt-2 text-white px-4 py-2 rounded hover:bg-gray-600 mb-2"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600 font-semibold">${product.price}</p>
            <button
              onClick={() => handleAddToCartClick(product)}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProductModal
          onClose={() => setIsModalOpen(false)}
          handleAddProduct={handleAddProduct}
          categoryId={categoryId}
        />
      )}
    </div>
  );
};

export default Product;
