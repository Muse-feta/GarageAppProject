import React from 'react'
import { Link } from 'react-router-dom';

const DashboredComponent = () => {
  return (
    <section class="services-section">
      <div class="auto-container">
        <div class="sec-title style-two">
          <h2>Dashbored</h2>
          <div class="text">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution.{" "}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Orders</h2>
              <Link to="/admin/orders" class="read-more">
                Open Orders
              </Link>
              <div class="icon">
                <span class="flaticon-power"></span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Employees</h2>
              <Link to="/admin/employees" class="read-more">
                Open Employees
              </Link>
              <div class="icon">
                <span class="flaticon-gearbox"></span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Add Employee</h2>
              <Link to="/admin/add-employee" class="read-more">
                Open Add Employee
              </Link>
              <div class="icon">
                <span class="flaticon-brake-disc"></span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Add Customer</h2>
              <Link to="/admin/add-customer" class="read-more">
                Open Add Customer
              </Link>
              <div class="icon">
                <span class="flaticon-brake-disc"></span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Customers</h2>
              <Link to="/admin/customers" class="read-more">
                Open Customers
              </Link>
              <div class="icon">
                <span class="flaticon-brake-disc"></span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Add Order</h2>
              <Link to="/admin/add-order" class="read-more">
                Open Add Order
              </Link>
              <div class="icon">
                <span class="flaticon-brake-disc"></span>
              </div>
            </div>
          </div>

          <div class="col-lg-4 service-block-one">
            <div class="inner-box hvr-float-shadow">
              <h5>Admin Dashbored</h5>
              <h2>Orders</h2>
              <Link to="/admin/orders" class="read-more">
                Open Orders
              </Link>
              <div class="icon">
                <span class="flaticon-brake-disc"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboredComponent