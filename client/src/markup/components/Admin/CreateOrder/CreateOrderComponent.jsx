import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import serviceService from "../../../../services/services.service";

const CreateOrderComponent = () => {
  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [Allservices, setAllServices] = useState([]);
  const [service_description_required, setService_description_required] = useState("");
  const [price_required, setPrice_required] = useState("");
  const [formData, setFormData] = useState({
    service_description: "",
    price: "",
  });
  const customer_id = window.location.pathname.split("/")[3];
  const vehicle_id = window.location.pathname.split("/")[4];


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    const response = customerService.getCustomerById(customer_id);
    response.then((data) => {
      setCustomer(data.data.data[0]);
      console.log(data.data.data);
    });

    const vehicle = vehicleService.getVehiclesByVehicleId(vehicle_id);
    vehicle.then((data) => {
      setVehicle(data.data.data[0]);
      console.log(data.data.data);
    });

    const services = serviceService.getServices();
    services.then((res) => {
      console.log(res);
      setAllServices(res);
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

      <div className=" border shadow-sm mt-3 rounded-md p-3 w-[1000px] mb-4">
        <div className=" flex gap-x-2 font-extrabold text-xl">
          <h1>{vehicle.vehicle_model}</h1>
        </div>
        <h1>
          <span className=" font-bold text-lg">Vehicle Color</span> :{" "}
          {vehicle.vehicle_color}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Tag</span> :{" "}
          {vehicle.vehicle_tag}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Year</span> :{" "}
          {vehicle.vehicle_year}
        </h1>
        <h1>
          <span className=" font-bold text-lg">Vehicle Milleage</span> :{" "}
          {vehicle.vehicle_mileage}
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

      <div className=" mt-7 border shadow-sm  rounded-md p-3 w-[1000px] mb-4">
        <div>
          <h1 className="mb-2 font-extrabold text-2xl">Choose Services</h1>
        </div>
        {Allservices?.map((data) => (
          <>
            <div className=" shadow-md px-4 py-3 mt-1 flex justify-between">
              <div>
                <h1 className="mb-2 font-extrabold text-xl">
                  {data.service_name}
                </h1>
                <h1>{data.service_description}</h1>
              </div>

              <div>
                <input type="checkbox" className=" h-5 w-5" />
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="border shadow-sm mt-3 rounded-md p-3 w-[1000px] mb-4 ">
          <div className=" flex justify-start m-2">
            <h1 className=" font-extrabold text-3xl">Additional Requests</h1>
            <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
          </div>
        <div className=" flex justify-center">
          <form onSubmit={handleSubmit}>
            {/* insert text area */}
            <textarea
              className={
                service_description_required
                  ? "md:w-[680px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                  : "md:w-[680px] py-3 px-5 mb-3 mt-3 input_border"
              }
              onChange={handleChange}
              name="service_description"
              value={formData.service_description}
              cols="30"
              rows="10"
              placeholder={
                service_description_required
                  ? service_description_required
                  : "Service Description"
              }
            ></textarea>{" "}
            <br />
            <input
              onChange={handleChange}
              className={
                price_required
                  ? "md:w-[680px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                  : "md:w-[680px] py-3 px-5 mb-3 mt-3 input_border"
              }
              type="text"
              placeholder={price_required ? price_required : "Price"}
              name="price"
              value={formData.price}
            />
            <br />
            <div className="link-btn mt-3">
              <button type="submit" className=" bg-red-500 btn-style-one">
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderComponent;
