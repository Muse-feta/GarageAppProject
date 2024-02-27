import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import customerService from "../../../../services/customer.service";
import { toast, Bounce } from "react-toastify";

const AddCustomerForm = () => {
  var employeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.token) {
    employeeToken = employee.token;
  }
  const [CustomerData, setCustomerData] = useState({
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: 1,
  });
  console.log(CustomerData);
  const [email_required, setEmailRequired] = useState("");
  const [server_error, setServerError] = useState("");
  const [phone_required, setPhoneRequired] = useState("");
  const [first_name_required, setFirstNameRequired] = useState("");
  const [last_name_required, setLastNameRequired] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!CustomerData.customer_email) {
      setEmailRequired("please enter email to continue");
      valid = false;
    } else if (!CustomerData.customer_email.includes("@")) {
      setCustomerData({
        ...CustomerData,
        customer_email: "",
      });
      setEmailRequired("please enter valid email to continue");
      valid = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(CustomerData.customer_email)) {
        setCustomerData({
          ...CustomerData,
          customer_email_email: "",
        });
        setEmailRequired("please enter valid email to continue");
        valid = false;
      } else {
        setEmailRequired("");
      }
    }

    if (!CustomerData.customer_first_name) {
      setFirstNameRequired("please enter first name");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // last name validation
    if (!CustomerData.customer_last_name) {
      setLastNameRequired("please enter last name");
      valid = false;
    } else {
      setLastNameRequired("");
    }

    // phone number validation
    if (!CustomerData.customer_phone_number) {
      setPhoneRequired("please enter phone number");
      valid = false;
    } else {
      setPhoneRequired("");
    }
    if (!valid) {
      return;
    }

    try {
      const res = await customerService.createCustomer(
        CustomerData,
        employeeToken
      );
      console.log(res);
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
      navigate("/");
    } catch (error) {
      console.log(error);
           toast.error(error.response.data.error, {
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
  };

  const handleChange = (e) => {
    {
      setCustomerData({
        ...CustomerData,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className=" my-11 ml-[100px]">
      <div>
        <div className=" flex">
          <h1 className=" font-extrabold text-3xl">Add a new Customer</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className={
              email_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={email_required ? email_required : "Customer email"}
            name="customer_email"
            value={CustomerData.customer_email}
          />
          <br />
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
            value={CustomerData.customer_first_name}
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
            value={CustomerData.customer_last_name}
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
            value={CustomerData.customer_phone_number}
          />
          <br />
          <div className="link-btn mt-3">
            <button type="submit" className=" bg-red-500 btn-style-one">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerForm;
