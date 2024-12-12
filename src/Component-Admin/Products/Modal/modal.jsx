import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProductModal = ({ onClose, handleAddProduct, handleUpdateProduct, editingProduct, categoryId }) => {
  const categories = useSelector((state) => state.categories.categories);
  
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: categoryId?.toString() || ''
  });
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setProductData({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId.toString()
      });
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl = productImage ? URL.createObjectURL(productImage) : editingProduct?.image || "https://via.placeholder.com/150";
    
    if (editingProduct) {
      handleUpdateProduct({
        ...editingProduct,
        ...productData,
        image: imageUrl
      });
    } else {
      handleAddProduct({
        ...productData,
        image: imageUrl
      });
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                rows="3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
                required={!editingProduct}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
