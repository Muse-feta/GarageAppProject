import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import NewOrderComponent from '../../components/Admin/AddOrder/NewOrderComponent';

const AddOrder = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <NewOrderComponent/>
    </div>
  );
}

export default AddOrder