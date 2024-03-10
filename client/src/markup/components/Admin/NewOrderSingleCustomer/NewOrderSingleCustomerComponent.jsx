import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import { MdTouchApp } from "react-icons/md";

const NewOrderSingleCustomerComponent = () => {
  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const id = window.location.pathname.split("/")[3];
  useEffect(() => {
    
    const response = customerService.getCustomerById(id);
    response.then((data) => {
      setCustomer(data.data.data[0]);
      console.log(data.data.data);
    });

    const res = vehicleService.getVehiclesByCustomerId(id);
    res.then((data) => {
      setVehicle(data.data.data);
      console.log(data.data.data);
    });
  }, []);
  return (
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Create New Order</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>

      <div className=" border shadow-sm mt-3 rounded-md p-3 w-[1000px] mb-4">
        <div className=" flex gap-x-2 font-extrabold text-xl">
          <h1>{customer.customer_first_name}</h1>
          <h1>{customer.customer_last_name}</h1>
        </div>
        <h1>
          <span className=" font-bold text-lg">Email</span> :{" "}
          {customer.customer_email}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Phone</span> :{" "}
          {customer.customer_phone_number}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Active Customer</span> :{" "}
          {customer.active_customer_status ? "Yes" : "No"}
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

      <div>
        <div className=" mt-34">
          
            <div className=" text-xl m-3 font-bold ">
              Vehicles Of: {customer.customer_first_name}
            </div>
          
        </div>
        <>
          <div class="flex flex-col lg:w-[1000px] overflow-x-auto">
            <div class=" sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_model
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_make
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_type
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_year
                        </th>

                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_tag
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          vehicle_serial
                        </th>

                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Choose
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-x-auto">
                      {vehicle.map((vehicle) => (
                        <tr class="bg-gray-100 border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {vehicle.vehicle_model}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {vehicle.vehicle_make}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {vehicle.vehicle_type}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {vehicle.vehicle_year}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {vehicle.vehicle_tag}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {vehicle.vehicle_serial}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Link to={`/admin/new-order/${id}/${vehicle?.vehicle_id}`}>
                              <MdTouchApp />
                            </Link>
                          </td>
                        </tr>
                      ))}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default NewOrderSingleCustomerComponent;
