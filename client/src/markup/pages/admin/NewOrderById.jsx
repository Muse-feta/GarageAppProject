import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import NewOrderSingleCustomerComponent from '../../components/Admin/NewOrderSingleCustomer/NewOrderSingleCustomerComponent';

const NewOrderById = () => {
  return (
    <div className=" flex overflow-hidden">
      <AdminMenu/>
      <NewOrderSingleCustomerComponent/>
    </div>
  );
}

export default NewOrderById