import React, { useEffect, useState } from 'react'
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";




const EditCustomerForm = () => {

const navigate = useNavigate();
  let employeeToken = "";
  const { customer } = useAuth();
  console.log(customer);
  if (customer && customer.token) {
    employeeToken = customer.token;
  }
  // console.log(employeeTokenn);

  const [phone_required, setPhoneRequired] = useState("");
  const [first_name_required, setFirstNameRequired] = useState("");
  const [last_name_required, setLastNameRequired] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     const id = window.location.pathname.split("/")[3];
     const response = await customerService.updateCustomer(
       id,
       CustomersData,
       employeeToken
     );
     if (response.status === 200) {
          toast.success(response.data.message, {
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
       navigate("/admin/customers");
     }
   } catch (error) {
    console.log(error);
   }
  };

  // fetch single customer info
  const [customers, setCustomers] = useState({});
  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    const response = customerService.getCustomerById(id, employeeToken);
    response.then((data) => {
      setCustomers(data.data.data);
      setCustomersData(data.data.data[0]);
      console.log(data.data.data);
    });
  }, [ employeeToken ]);

    const [CustomersData, setCustomersData] = useState({
      customer_first_name: "",
      customer_last_name: "",
      customer_phone_number: "",
      active_customer_status: 1,
    });

  const handleChange = (e) => {
       
    setCustomersData({
      ...CustomersData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(CustomersData);
  return (
    <div className=" my-11 ml-[100px]">
      <div>
        <div className=" flex">
          {customers.length > 0 && (
            <h1 className=" font-extrabold text-3xl">
              Edit : {customers[0].customer_first_name},
              {customers[0].customer_last_name}
            </h1>
          )}
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>
        {customers.length > 0 && (
          <div className=" text-md m-1 font-bold">
            Customer Email: {customers[0].customer_email}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className={
              first_name_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={
              first_name_required ? first_name_required : "Customer first Name"
            }
            name="customer_first_name"
            value={CustomersData.customer_first_name}
          />
          <br />
          <input
            onChange={handleChange}
            className={
              last_name_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={
              last_name_required ? last_name_required : "Customer last Name"
            }
            name="customer_last_name"
            value={CustomersData.customer_last_name}
          />

          <br />
          <input
            onChange={handleChange}
            className={
              phone_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={
              phone_required ? phone_required : "Customer Phone Number"
            }
            name="customer_phone_number"
            value={CustomersData.customer_phone_number}
          />
          <br />
          <div className='flex gap-3 m-2'>
            <input
              type="checkbox"
              name="active_customer_status"
              checked={CustomersData.active_customer_status === 1}
              onChange={ () => CustomersData.active_customer_status === 1 ? setCustomersData({ ...CustomersData, active_customer_status: 0 }) : setCustomersData({ ...CustomersData, active_customer_status: 1 }) }
              value={CustomersData.active_customer_status}
            />
            <h1>Is Active Customer</h1>
          </div>
          <div className="link-btn mt-3">
            <button type="submit" className=" bg-red-500 btn-style-one">
              UpDate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomerForm