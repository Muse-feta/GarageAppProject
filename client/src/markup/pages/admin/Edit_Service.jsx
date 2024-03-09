import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditServiceComponent from '../../components/Admin/EditService/EditServiceComponent';

const Edit_Service = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <EditServiceComponent/>
    </div>
  );
}

export default Edit_Service