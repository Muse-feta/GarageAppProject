import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import Add_Employee from "./markup/pages/admin/Add_Employee";
import Unauthorized from "./markup/pages/UnAuthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Customers from "./markup/pages/admin/Customers";
import Orders from "./markup/pages/admin/Orders";
import Employees from "./markup/pages/admin/Employees";

// import css files
import "./template-assets/assets/css/bootstrap.css";
import "./template-assets/assets/css/style.css";
import "./template-assets/assets/css/responsive.css";
import "./template-assets/assets/css/color.css";
import "./assets/styles/custom.css";
import Shared_layout from "./markup/pages/Shared_layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add_Customer from "./markup/pages/admin/Add_Customer";
import EditCustomerForm from "./markup/components/Admin/Edit_Customer/EditCustomerForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shared_layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* <Route path="/admin/add-employee" element={<Add_Employee />} /> */}
          <Route
            path="/admin/customers"
            element={
              <PrivateAuthRoute role={[2, 3]}>
                <Customers />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <PrivateAuthRoute role={[1, 2, 3]}>
                <Orders />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <PrivateAuthRoute role={[3]}>
                <Employees />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/admin/add-employee"
            element={
              <PrivateAuthRoute role={[3]}>
                <Add_Employee />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/admin/add-customer"
            element={
              <PrivateAuthRoute role={[3]}>
                <Add_Customer />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/admin/customer-edit/:id"
            element={
              <PrivateAuthRoute role={[3]}>
                <EditCustomerForm/>
              </PrivateAuthRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
