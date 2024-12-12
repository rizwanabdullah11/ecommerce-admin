import React, { useState, useEffect } from "react";

const Modal = ({ onClose, handleAddCategory, handleUpdateCategory, editingCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const imageUrl = categoryImage 
        ? URL.createObjectURL(categoryImage) 
        : editingCategory?.image || "https://via.placeholder.com/150";

      if (editingCategory) {
        handleUpdateCategory({
          ...editingCategory,
          name: categoryName.trim(),
          image: imageUrl
        });
      } else {
        handleAddCategory({
          name: categoryName.trim(),
          image: imageUrl
        });
      }
      
      setCategoryName("");
      setCategoryImage(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {editingCategory ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-black">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border px-4 py-2 rounded text-black"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-black">Category Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full border px-4 py-2 rounded text-black"
              required={!editingCategory}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 text-white"
            >
              {editingCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
