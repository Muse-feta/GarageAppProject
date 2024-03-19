import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import serviceService from "../../../../services/services.service";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";
import order_services from "../../../../services/orders.service";

const ViewOrderComonent = () => {
  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const { employee } = useAuth();
  const employee_id = employee?.decodedToken?.employee_id;
  const order_id = window.location.href.split("/")[3];

 
useEffect(() => {
  const res = order_services.getSingleOrder(order_id);
  res.then((data) => {
    setOrder(data);
    console.log(data);
  });
}, [])

  // useEffect(() => {
  //   const response = customerService.getCustomerById(customer_id);
  //   response.then((data) => {
  //     setCustomer(data.data.data[0]);
  //     console.log(data.data.data);
  //   });

  //   const vehicle = vehicleService.getVehiclesByVehicleId(vehicle_id);
  //   vehicle.then((data) => {
  //     setVehicle(data.data.data[0]);
  //     console.log(data.data.data);
  //   });

  //   const services = serviceService.getServices();
  //   services.then((res) => {
  //     console.log(res);
  //     setAllServices(res);
  //   });
  // }, []);

  return (
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Single Order</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>

      <div className=" border shadow-sm mt-3 rounded-md p-3 w-[1000px] mb-4">
        <div className=" flex gap-x-2 font-extrabold text-xl">
          <h1>{customer?.customer_first_name}</h1>
          <h1>{customer?.customer_last_name}</h1>
        </div>
        <h1>
          <span className=" font-bold text-lg">Email</span> :{" "}
          {customer?.customer_email}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Phone</span> :{" "}
          {customer?.customer_phone_number}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Active Customer</span> :{" "}
          {customer?.active_customer_status ? "Yes" : "No"}
        </h1>
        <div>
          <div className=" text-md font-bold flex gap-x-3">
            <h1>Edit Customer Info</h1>
            <Link to={`/admin/customer-edit/${customer?.customer_id}`}>
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>

      <div className=" border shadow-sm mt-3 rounded-md p-3 w-[1000px] mb-4">
        <div className=" flex gap-x-2 font-extrabold text-xl">
          <h1>{vehicle?.vehicle_model}</h1>
        </div>
        <h1>
          <span className=" font-bold text-lg">Vehicle Color</span> :{" "}
          {vehicle?.vehicle_color}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Tag</span> :{" "}
          {vehicle?.vehicle_tag}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Year</span> :{" "}
          {vehicle?.vehicle_year}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Milleage</span> :{" "}
          {vehicle?.vehicle_mileage}
        </h1>
        <div>
          <div className=" text-md font-bold flex gap-x-3">
            <h1>Edit Vehicle Info</h1>
            <Link to={`/admin/customer-edit/${customer?.customer_id}`}>
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderComonent;
