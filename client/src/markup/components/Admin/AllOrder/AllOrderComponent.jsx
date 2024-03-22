import React, { useEffect, useState } from 'react';
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
  if (customer && customer.token) {
    employeeToken = customer.token;
  }

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

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

            const vehicle = vehicleService.getVehiclesByVehicleId(
              order.vehicle_id
            );
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
            };
          })
        );

        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [employeeToken]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {!currentOrders ? (
        <h1>No Orders Found</h1>
      ) : (
        <div className=" m-10 border">
          <div className=" flex m-3">
            <h1 className=" font-extrabold text-3xl">Orders </h1>
            <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
          </div>

          <div>
            <div className="flex flex-col w-[900px] overflow-x-auto">
              <div className=" sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Order Id
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Customer
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Vehicle
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Order Date
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Received By
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Order Status
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            View / Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="overflow-x-auto">
                        {currentOrders.map((order) => (
                          <tr
                            key={order.order_id}
                            className="bg-white border-b"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.order_id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div>
                                <h1>{order.customerName}</h1>
                                <h1>{order.customer_email}</h1>
                                <h1>{order.customer_phone}</h1>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div>
                                <h1>{order.vehicle_model}</h1>
                                <h1>{order.vehicle_year}</h1>
                                <h1>{order.vehicle_tag}</h1>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {format(new Date(order.order_date), "MM/dd/yyyy")}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                              <div>
                                {order.employee_role === 3 ? "Admin" : null}
                                {order.employee_role === 2 ? "Manager" : null}
                                {order.employee_role === 1 ? "Employee" : null}
                                <h1>{order.employeeName}</h1>
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
                              <div className=" flex justify-center items-center text-xl mt-3">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="bg-white p-2 rounded-md">
              <ul className="flex">
                <li>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`bg-[#e84f4f] hover:bg-[#ff4a4a] text-white font-bold py-2 px-4 rounded ${
                      currentPage === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Previous
                  </button>
                </li>
                {[
                  ...Array(Math.ceil(orders.length / ordersPerPage)).keys(),
                ].map((number) => (
                  <li key={number} className="mx-1">
                    <button
                      onClick={() => paginate(number + 1)}
                      className={`bg-[#e84f4f] hover:bg-[#ff4a4a] text-white font-bold py-2 px-4 rounded ${
                        currentPage === number + 1 && "bg-[#e84f4f] "
                      }`}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(orders.length / ordersPerPage)
                    }
                    className={`bg-[#e84f4f] hover:bg-[#ff4a4a] text-white font-bold py-2 px-4 rounded ${
                      currentPage ===
                        Math.ceil(orders.length / ordersPerPage) &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrderComponent;





