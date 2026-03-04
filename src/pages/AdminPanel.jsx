import React from 'react'
import AdminSideSection from '../sections/AdminSideSection'
import { Outlet } from 'react-router'
import AdminDashboard from './AdminDashboard'
import AdminProductList from './AdminProductList'
import AdminProduct from './AdminProduct'
import AdminCatogeries from './AdminCatogeries'
import AdminOrder from './AdminOrder'
import AdminSetting from './AdminSetting'

const AdminPanel = () => {
  return (
    <div>
      <AdminSideSection>
        <Outlet/>
      </AdminSideSection>
    </div>
  )
}

export default AdminPanel
