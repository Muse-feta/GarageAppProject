import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditOrderComponent from '../../components/Admin/EditSingleOrder.jsx/EditOrderComponent';

const EditOrder = () => {
  return (
    <div className=" flex">
      <AdminMenu />
      <EditOrderComponent />
    </div>
  );
}

export default EditOrder