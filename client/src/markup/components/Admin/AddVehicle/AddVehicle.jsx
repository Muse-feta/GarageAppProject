import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import vehicleService from '../../../../services/vehicle.service';
import AddVehicleForm from './AddVehicleForm';


const AddVehicle = () => {
    
    const id = window.location.pathname.split("/")[3];
  // fetch single customer info
  const [customers, setCustomers] = useState({});
  const [vehicle, setVehicle] = useState([]);
   let employeeToken = "";
   const { customer } = useAuth();
   console.log(customer);
   if (customer && customer.token) {
     employeeToken = customer.token;
   }
  useEffect(() => {
    
    const response = customerService.getCustomerById(id, employeeToken);
    response.then((data) => {
      setCustomers(data.data.data);
      console.log(data.data.data);
    });

    const res = vehicleService.getVehiclesByCustomerId(id, employeeToken);
    res.then((data) => {
      setVehicle(data.data.data);
      console.log(data.data.data);
    })
  }, [employeeToken]);
  return (
    <div className="">
      <div className=" flex gap-x-4 m-10">
        <div className=" bg-[#ee0d09] rounded-[50%] w-[120px] ">
          <h1 className=" text-center mt-[50px] text-xl font-extrabold text-white">
            Info
          </h1>
        </div>
        <div>
          {customers.length > 0 && (
            <div className=" text-2xl m-1 font-bold">
              Customer: {customers[0].customer_first_name}
            </div>
          )}
          <div>
            {customers.length > 0 && (
              <div className=" text-md m-1 font-bold">
                Customer Email: {customers[0]?.customer_email}
              </div>
            )}
            {customers.length > 0 && (
              <div className=" text-md m-1 font-bold">
                Phone Number: {customers[0]?.customer_phone_number}
              </div>
            )}
            {customers.length > 0 && (
              <div className=" text-md m-1 font-bold">
                Active Customer:{" "}
                {customers[0].active_customer_status === 1 ? "Yes" : "No"}
              </div>
            )}
            <div>
              <div className=" text-md m-1 font-bold flex gap-x-3">
                <h1>Edit Customer Info</h1>
                <Link to={`/admin/customer-edit/${customers[0]?.customer_id}`}>
                  <FaEdit />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-x-4 m-10 mt-[100px]">
        <div className=" bg-[#ee0d09] rounded-[50%] w-[120px] h-[120px]">
          <h1 className=" text-center text-xl font-extrabold text-white pt-12">
            Info
          </h1>
        </div>

        <div>
          <div className=" mt-34">
            {customers.length > 0 && (
              <div className=" text-2xl m-1 font-bold ">
                Vehicles Of: {customers[0].customer_first_name}
              </div>
            )}
          </div>
          <>
            <div class="flex flex-col w-[700px] overflow-x-auto">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                            vehicle_mileage
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
                            vehicle_color
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
                              {vehicle.vehicle_mileage}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {vehicle.vehicle_tag}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {vehicle.vehicle_serial}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {vehicle.vehicle_color}
                            </td>
                          </tr>
                        ))}
                        {/* <tr class="bg-white border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    2
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Jacob
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Thornton
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    @fat
                  </td>
                </tr> */}
                        {/* <tr class="bg-gray-100 border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    3
                  </td>
                  <td
                    colspan="2"
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                  >
                    Larry the Bird
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    @twitter
                  </td>
                </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>

      <div className=" flex justify-center items-center">
        <div>
          <div className=" flex">
            <h1 className=" font-extrabold text-3xl">Add a new vehicle</h1>
            <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
          </div>
          <AddVehicleForm customer_id={id} />
        </div>
      </div>

      <div className=" flex gap-x-4 m-10 mt-[100px]">
        <div className=" bg-[#ee0d09] rounded-[50%] w-[120px] h-[120px]">
          <h1 className=" text-center text-xl font-extrabold text-white pt-12">
            Orders
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle