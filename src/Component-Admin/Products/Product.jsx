import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '../../Redux/productSlice';
import ProductModal from './Modal/modal';

const Product = ({ categoryId, searchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  const handleAddProduct = (newProduct) => {
    const isDuplicate = products.some(
      prod => prod.name.toLowerCase() === newProduct.name.toLowerCase()
    );
    if (!isDuplicate) {
      const selectedCategory = categories.find(cat => cat.id === parseInt(newProduct.categoryId));
      dispatch(addProduct({ 
        id: Date.now(),
        ...newProduct,
        categoryId: parseInt(newProduct.categoryId),
        categoryName: selectedCategory.name
      }));
      setIsModalOpen(false);
    } else {
      alert('Product with this name already exists!');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const isDuplicate = products.some(
      prod => prod.id !== updatedProduct.id && 
      prod.name.toLowerCase() === updatedProduct.name.toLowerCase()
    );
    if (!isDuplicate) {
      const selectedCategory = categories.find(cat => cat.id === parseInt(updatedProduct.categoryId));
      dispatch(updateProduct({
        ...updatedProduct,
        categoryId: parseInt(updatedProduct.categoryId),
        categoryName: selectedCategory.name
      }));
      setIsModalOpen(false);
      setEditingProduct(null);
    } else {
      alert('Product with this name already exists!');
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
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
    <div className="p-4">
      <div className="justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center">
          {categoryId 
            ? `${categories.find(cat => cat.id === categoryId)?.name} Products`
            : 'All Products'
          }
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 text-white"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-600 font-semibold">${product.price}</p>
            <p className="text-gray-500">Category: {product.categoryName}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProductModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct}
          editingProduct={editingProduct}
          categoryId={categoryId}
        />
      )}
    </div>
  );

};

export default Product;
