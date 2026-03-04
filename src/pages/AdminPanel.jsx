import AdminSideSection from '../sections/AdminSideSection'
import { Outlet } from 'react-router'


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
