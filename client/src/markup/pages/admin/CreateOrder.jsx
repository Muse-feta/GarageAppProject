import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import CreateOrderComponent from '../../components/Admin/CreateOrder/CreateOrderComponent';

const CreateOrder = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <CreateOrderComponent/>
    </div>
  );
}

export default CreateOrder