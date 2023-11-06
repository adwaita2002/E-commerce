import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/component/AdminProductList.js'
import AdminProtected from '../features/auth/component/AdminProtected'

export default function AdminHome() {
  return (
    <>

      <Navbar>
      <AdminProtected>
          <AdminProductList/>
      </AdminProtected>
      </Navbar>
    </>
  )
}
