import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";
import { Link } from "react-router-dom";
import customerService from "../../../../services/customer.service";

const NewOrderComponent = () => {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const handleSearch = () => {
    const res = customerService.searchCustomer(query);
    res.then((data) => {
      setCustomers(data.data.data);
      console.log(data.data.data);
    });
  };

  return (
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Create New Order</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>

      <div className="input_border  py-3 px-5 mb-3 mt-3">
        <input
          onChange={(e) => setQuery(e.target.value)}
          className=" md:w-[680px] "
          type="text"
          placeholder="Search By Customer Name, Phone, Email"
          name="service_name"
          value={query}
        />

        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div>
        {customers.map((data) => (
          <table class="min-w-full">
            <tbody className="overflow-x-auto">
              <tr class="bg-gray-100 border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.customer_first_name}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data.customer_last_name}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data.customer_email}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data.customer_phone_number}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/new-order/${data.customer_id}`}
                    className="text-2xl"
                  >
                    <MdTouchApp />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      <div className="link-btn mt-3">
        <button className=" bg-red-500 btn-style-one">Add New Customer</button>
      </div>
    </div>
  );
};

export default NewOrderComponent;
