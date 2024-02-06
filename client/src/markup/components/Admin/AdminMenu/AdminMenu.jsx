import React from 'react'
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className=" w-[30%]  m-0">
      <div className="bg-[#090e1c] p-3 text-center text-white">
        <h1 className=" text-white text-xl">Admin Menu</h1>
      </div>

      <div className=" bg-[#081949] h-full">
        <div className=" p-3 border-b-2">
          <Link to="/admin/dashbored" className="text-white">
            Dashbored
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/orders" className="text-white">
            Orders
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/new-order" className="text-white">
            New Order
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/add-employee" className="text-white">
            Add Employee
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/employees" className="text-white">
            Employees
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/add-customer" className="text-white">
            Add Customer
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/customers" className="text-white">
            Customers
          </Link>
        </div>

        <div className=" p-3 border-b-2">
          <Link to="admin/services" className="text-white">
            Services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu