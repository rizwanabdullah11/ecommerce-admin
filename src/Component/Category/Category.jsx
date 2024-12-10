import React, { useState } from 'react';
import AddCategory from './Modal/modal';

const Category = ({ isOpen, onSelectCategory, showCategories, searchQuery }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Shoes",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Clothes",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Mobile",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Laptop",
      image: "https://via.placeholder.com/150",
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = (newCategory) => {
    setCategories([{
      id: Date.now(),
      ...newCategory
    }, ...categories]);
    setIsModalOpen(false);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div>
      {showCategories && (
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-1 bg-gray-500 mt-2 text-white rounded hover:bg-gray-600"
          >
            Add Category
          </button>
          <div className="grid grid-cols-4 gap-4 mb-8 mt-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div 
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onSelectCategory(category)}
                >
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4 bg-white rounded-b-lg text-center">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <AddCategory
          onClose={() => setIsModalOpen(false)}
          handleAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export default Category;
