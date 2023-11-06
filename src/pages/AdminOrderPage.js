import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrder from '../features/admin/component/AdminOrder'
import AdminProtected from '../features/auth/component/AdminProtected'

export default function AdminOrderPage() {
  return (
    <>

      <Navbar>
      <h1 className='text-[30px] font-extrabold italic'>All Orders here</h1>
      <AdminProtected>
          <AdminOrder/>
      </AdminProtected>
      </Navbar>
    </>
  )
}