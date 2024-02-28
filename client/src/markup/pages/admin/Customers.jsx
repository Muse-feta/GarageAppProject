import React from 'react'
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import CustomerList from '../../components/Admin/CustomerList/CustomerList';

const Customers = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <CustomerList/>
    </div>
  );
}

export default Customers