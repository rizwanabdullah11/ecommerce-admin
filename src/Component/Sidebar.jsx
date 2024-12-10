import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ setShowProducts, setShowCategories }) => {

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to='/admin' className="block p-2 text-xl hover:bg-gray-700 rounded cursor-pointer">
              Admin Panel
            </Link>
          </li>
          <li>
            <div 
              className="bg-gray-800 p-2 text-xl rounded cursor-pointer hover:bg-gray-700"
              onClick={() => setShowCategories(true)}
            >
              Category
            </div>
          </li>
          <li>
            <div 
              className="block p-2 text-xl hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => {
                setShowProducts(true)
                setShowCategories(false)
              }}
            >
              Products
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar

