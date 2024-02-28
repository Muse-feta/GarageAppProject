import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  let customerToken = "";
  const { customer } = useAuth();
  if (customer && customer.token) {
    customerToken = customer.token;
  }
  // console.log(customerToken);

  useEffect(() => {
    const res = customerService.getAllCustomers(customerToken);
    res.then((res) => {
      setCustomers(res.data.data);
      console.log(res.data.data);
    });
  }, [customerToken]);

  const handleDelete = async (id) => {
    try {
      const res = await customerService.deleteCustomer(id, customerToken);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
  }
  return (
    <div>
      <>
        <div className=" flex m-7">
          <h1 className=" font-extrabold text-3xl">customers</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>
        <div class="flex flex-col w-full overflow-x-auto">
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
                        Id
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Added Date
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Active
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Edit/Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-auto">
                    {customers.map((customer) => (
                      <tr class="bg-gray-100 border-b">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {customer.customer_id}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.customer_first_name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.customer_last_name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.customer_email}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {customer.customer_phone_number}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {format(
                            new Date(customer.customer_added_date),
                            "MM/dd/yyyy"
                          )}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {customer.active_customer_status === 1 ? "Yes" : "No"}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <Link
                              to={`/admin/customer-edit/${customer.customer_id}`}
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(customer.customer_id)}
                            >
                              <MdDelete/>
                            </button>
                          </div>
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
  );
};

export default CustomerList;
