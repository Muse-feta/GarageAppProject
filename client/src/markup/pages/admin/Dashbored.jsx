import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import DashboredComponent from '../../components/Admin/Dashbored/DashboredComponent';

const Dashbored = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <DashboredComponent/>
    </div>
  );
}

export default Dashbored