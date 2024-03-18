import React, { useEffect, useState } from 'react'
import order_services from '../../../../services/orders.service';
import customerService from '../../../../services/customer.service';
import { Link } from 'react-router-dom';

const ViewOrderComponent = () => {

  const [SingleOrder, setSingleOrder] = useState([]);
  const [Customer, setCustomer] = useState([]);
  console.log(Customer)
  console.log(SingleOrder)
  // console.log(SingleOrder[0].customer_id);
  const customer_id = SingleOrder[0]?.customer_id;
  console.log(customer_id)
  const order_id = window.location.pathname.split("/")[3];

  useEffect(() => {
    const res = order_services.getSingleOrder(order_id);
    res.then((data) => {
      setSingleOrder(data.data);
      console.log(data)
    });

     const res2 = customerService.getCustomerById(customer_id);
     res2.then((data) => {
       setCustomer(data.data.data[0]);
       console.log(data.data.data[0]);
     });
  }, []);
  return (
    <div className=' m-6'>
      <div className=" flex m-3">
        <h1 className=" font-extrabold text-3xl">Single Order</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>

      <div className=" border shadow-sm mt-3 rounded-md p-3 w-[800px] mb-4">
        <div className=" flex gap-x-2 font-extrabold text-xl">
          <h1>{Customer?.customer_first_name}</h1>
          <h1>{Customer.customer_last_name}</h1>
        </div>
        <h1>
          <span className=" font-bold text-lg">Email</span> :{" "}
          {Customer.customer_email}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Phone</span> :{" "}
          {Customer.customer_phone_number}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Active Customer</span> :{" "}
          {Customer.active_customer_status ? "Yes" : "No"}
        </h1>
        <div>
          <div className=" text-md font-bold flex gap-x-3">
            <h1>Edit Customer Info</h1>
            <Link to={`/admin/customer-edit/${customer_id}`}>
              {/* <FaEdit /> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrderComponent