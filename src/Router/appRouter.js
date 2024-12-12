// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Dashboard from '../Component-User/Dashboard'
// import Cart from '../Component-User/Cart'
// import Checkout from '../Component-User/Checkout'
// import LandingPage from '../Component-User/Landing'
// import Home from '../Component-Admin/Home'

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/admin/*" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default AppRouter
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../Component-User/Dashboard'
import Cart from '../Component-User/Cart'
import Checkout from '../Component-User/Checkout'
import LandingPage from '../Component-User/Landing'
import AdminHome from '../Component-Admin/Home'
import Category from '../Component-Admin/Category/Category'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin" element={<AdminHome />}>
          <Route index element={<Navigate to="categories" replace />} />
          <Route path="categories" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
