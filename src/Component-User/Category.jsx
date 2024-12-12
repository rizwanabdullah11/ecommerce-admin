import React from 'react';
import { useSelector } from 'react-redux';

const Category = ({ onSelectCategory }) => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="fixed left-0 top-20 h-full w-64 bg-blue-900 shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li 
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="cursor-pointer py-2 px-4 text-white bg-gray-800 hover:bg-blue-700 rounded-md transition-colors"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
