import React from 'react'
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EmployeesList from '../../components/Admin/EmployeesList/EmployeesList';


const Employees = () => {
  return (
    <div className=" flex overflow-hidden">
      <AdminMenu/>
      <EmployeesList/>
    </div>
  );
}

export default Employees