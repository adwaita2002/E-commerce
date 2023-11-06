import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetails from '../features/admin/component/AdminProductDetails'
import AdminProtected from '../features/auth/component/AdminProtected'

export default function AdminProductDetailsPage() {
  return (
    <>

    <Navbar>
     <AdminProtected><AdminProductDetails></AdminProductDetails></AdminProtected>    
    </Navbar>
      
    </>
  )
}
