import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import AddCustomerForm from '../../components/Admin/AddCustomer/AddCustomerForm';

const Add_Customer = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <AddCustomerForm/>
    </div>
  );
}

export default Add_Customer