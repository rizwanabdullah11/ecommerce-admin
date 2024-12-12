import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, deleteCategory, updateCategory } from '../../Redux/categorySlice';
import Modal from './Modal/modal';
import Product from '../Products/Product';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const handleAddCategory = (newCategory) => {
    const isDuplicate = categories.some(
      cat => cat.name.toLowerCase() === newCategory.name.toLowerCase()
    );
    if (!isDuplicate) {
      dispatch(addCategory({ id: Date.now(), ...newCategory }));
      setIsModalOpen(false);
    } else {
      alert('Category with this name already exists!');
    }
  };
 
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowProducts(true);
  };

  const handleEditCategory = (category, e) => {
    e.stopPropagation();
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory) => {
    const isDuplicate = categories.some(
      cat => cat.id !== updatedCategory.id && 
      cat.name.toLowerCase() === updatedCategory.name.toLowerCase()
    );
    if (!isDuplicate) {
      dispatch(updateCategory(updatedCategory));
      setIsModalOpen(false);
      setEditingCategory(null);
    } else {
      alert('Category with this name already exists!');
    }
  };

  const handleDeleteCategory = (categoryId, e) => {
    e.stopPropagation();
    dispatch(deleteCategory(categoryId));
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(null);
      setShowProducts(false);
    }
  };

  return (
    <div className="p-4">
      <div className="justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 text-white"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCategoryClick(category)}
          >
            <img 
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{category.name}</h3>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={(e) => handleEditCategory(category, e)}
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteCategory(category.id, e)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showProducts && selectedCategory && (
        <div className="mt-8">
          <Product categoryId={selectedCategory.id} />
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          handleAddCategory={handleAddCategory}
          handleUpdateCategory={handleUpdateCategory}
          editingCategory={editingCategory}
        />
      )}
    </div>
  );
};

export default Category;
