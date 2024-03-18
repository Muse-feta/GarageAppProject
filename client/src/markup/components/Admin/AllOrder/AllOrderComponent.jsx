import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import order_services from '../../../../services/orders.service';
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../context/AuthContext';
import employeeService from '../../../../services/employee.service';
import { format } from "date-fns";
import vehicleService from '../../../../services/vehicle.service';


const AllOrderComponent = () => {

     let employeeToken = "";
     const { customer } = useAuth();
     console.log(customer);
     if (customer && customer.token) {
       employeeToken = customer.token;
     }
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    console.log(orders);
    const customer_id = orders.customer_id


     useEffect(() => {
       const fetchOrders = async () => {
         try {
           const orderResponse = await order_services.getAllOrders();
           const fetchedOrders = orderResponse.data;

           // Fetch customer details for each order
           const ordersWithDetails = await Promise.all(
             fetchedOrders.map(async (order) => {
               const customerResponse = await customerService.getCustomerById(
                 order.customer_id,
                 employeeToken
               );
               const customerDetails = customerResponse.data.data[0];
                const employeeResponse = await employeeService.getEmployeeById(
                  order.employee_id,
                  employeeToken
                );
                const employeeDetails = employeeResponse.data.data[0];

                 const vehicle =
                   vehicleService.getVehiclesByVehicleId(order.vehicle_id);
                   const vehicleDetails = await vehicle;
               return {
                 ...order,
                 customerName: customerDetails.customer_first_name,
                 customer_email: customerDetails.customer_email,
                 customer_phone: customerDetails.customer_phone_number,
                 employeeName: employeeDetails.employee_first_name,
                 employee_role: employeeDetails.company_role_id,
                 vehicle_model: vehicleDetails.data.data[0].vehicle_model,
                 vehicle_year: vehicleDetails.data.data[0].vehicle_year,
                 vehicle_tag: vehicleDetails.data.data[0].vehicle_tag,
               }; // Add customer name to order object
             })
           );

           setOrders(ordersWithDetails);
         } catch (error) {
           console.error("Error fetching orders:", error);
         }
       };

       fetchOrders();
     }, []);
    
  return (
    <div>
      {!orders ? (
        <h1>No Orders Found</h1>
      ) : (
        <div className=" m-10 border">
          <div className=" flex m-3">
            <h1 className=" font-extrabold text-3xl">Orders </h1>
            <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
          </div>

          <div>
            <>
              <div class="flex flex-col w-[900px] overflow-x-auto">
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
                              Order Id
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Customer
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              vehicle
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Order Date
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Recived By
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Order Status
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              View / Edit
                            </th>
                          </tr>
                        </thead>
                        {orders.map((order) => (
                          <tbody className="overflow-x-auto">
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.order_id}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <h1>{order.customerName}</h1> <br />
                                <h1>{order.customer_email}</h1> <br />
                                <h1>{order.customer_phone}</h1>
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <h1>{order.vehicle_model}</h1> <br />
                                <h1>{order.vehicle_year}</h1> <br />
                                <h1>{order.vehicle_tag}</h1> <br />
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {format(
                                  new Date(order.order_date),
                                  "MM/dd/yyyy"
                                )}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                                <h1 className=" flex justify-between">
                                  {" "}
                                  {order.employee_role === 3 ? "Admin" : null}
                                  {order.employee_role === 2 ? "Manager" : null}
                                  {order.employee_role === 1
                                    ? "Employee"
                                    : null}
                                  <h1>{order.employeeName}</h1>
                                </h1>
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {order.order_status === 0 ? (
                                  <h1 className=" bg-[#ffc83c] rounded-md text-center font-bold">
                                    Pending
                                  </h1>
                                ) : (
                                  <h1 className=" bg-[#00ff00] rounded-md text-center font-bold">
                                    Completed
                                  </h1>
                                )}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
                                <div className=" flex justify-center items-center text-xl mt-5">
                                  <Link
                                    to={`/admin/edit-order/${order.order_id}`}
                                  >
                                    <FaEdit />
                                  </Link>
                                  <Link
                                    to={`/admin/view-order/${order.order_id}`}
                                  >
                                    <MdOpenInNew />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrderComponent