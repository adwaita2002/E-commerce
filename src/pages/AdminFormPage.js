import React from 'react'
import AdminForm from '../features/admin/component/AdminForm'
import AdminProtected from '../features/auth/component/AdminProtected'

export default function () {
  return (
    <>
      <AdminProtected><AdminForm></AdminForm></AdminProtected>
    </>
  )
}
