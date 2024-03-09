import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import ServicesComponent from '../../components/Admin/Services/ServicesComponent'

const Service = () => {
  return (
     <div className=" flex overflow-hidden">
      <AdminMenu/>
      <ServicesComponent/>
    </div>
  )
}

export default Service