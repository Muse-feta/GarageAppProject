import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import ViewOrderComponent from '../../components/Admin/ViewOrder/ViewOrderComponent';

const ViewOrder = () => {
  return (
    <div className=" flex overflow-hidden">
      <AdminMenu/>
      <ViewOrderComponent/>
    </div>
  );
}

export default ViewOrder