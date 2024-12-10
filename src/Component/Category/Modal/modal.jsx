import React, { useState } from "react";

const Modal = ({ onClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const imageUrl = categoryImage ? URL.createObjectURL(categoryImage) : "https://via.placeholder.com/150";
      handleAddCategory({
        name: categoryName.trim(),
        image: imageUrl
      });
      setCategoryName("");
      setCategoryImage(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Add Category</h2>
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
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
