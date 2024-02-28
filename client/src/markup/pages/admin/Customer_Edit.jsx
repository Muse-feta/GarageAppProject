import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditCustomerForm from '../../components/Admin/Edit_Customer/EditCustomerForm';

const Customer_Edit = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <EditCustomerForm/>
    </div>
  );
}

export default Customer_Edit