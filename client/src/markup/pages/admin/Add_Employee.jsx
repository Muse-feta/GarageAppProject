import React from 'react'
import AddEmployeeForm from '../../components/Admin/AddEmployeeForm/AddEmployeeForm'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'

const Add_Employee = () => {
  return (
    <div className=' flex'>
      <AdminMenu/>
      <AddEmployeeForm/>
    </div>
  )
}

export default Add_Employee