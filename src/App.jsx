import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import AdminPanel from './pages/AdminPanel'
import AdminDashboard from './pages/AdminDashboard'
import AdminProductList from './pages/AdminProductList'
import AdminProduct from './pages/AdminProduct'
import AdminCatogeries from './pages/AdminCatogeries'
import AdminOrders from './pages/AdminOrders'
import AdminSetting from './pages/AdminSetting'
import AdminHomepage from './pages/AdminHomepage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductList />} />
           <Route path="product" element={<AdminProduct />} />
          <Route path="product/:id" element={<AdminProduct />} />
          <Route path="categories" element={<AdminCatogeries />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSetting />} />
          <Route path="homepage" element={<AdminHomepage />} />


        </Route>
      </Routes>
    </Router>
  )
}

export default App
