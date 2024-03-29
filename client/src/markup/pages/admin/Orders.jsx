import React from 'react'
import AllOrderComponent from '../../components/Admin/AllOrder/AllOrderComponent';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

const Orders = () => {
  return (
    <div className=" flex overflow-hidden">
      <AdminMenu/>
      <AllOrderComponent/>
    </div>
  );
}

export default Orders