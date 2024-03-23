import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import serviceService from "../../../../services/services.service";
import { Bounce, toast } from "react-toastify";
import order_services from "../../../../services/orders.service";
import customerService from "../../../../services/customer.service";

const EditOrderComponent = () => {
  const [customer, setCustomer] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [Allservices, setAllServices] = useState([]);
  const [service_description_required, setService_description_required] =
    useState("");
  const [price_required, setPrice_required] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  // console.log(selectedServices);
  const [formData, setFormData] = useState({
    additional_request: "",
    order_total_price: "",
    active_order: 1,
    order_completed: 0,
    order_status: 0,
    additional_requests_completed: 0,
  });

  const navigate = useNavigate();
  const { employee } = useAuth();
  const employee_id = employee?.decodedToken?.employee_id;
  const order_id = window.location.pathname.split("/")[3];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
       
useEffect(() => {
  const orders = order_services.getSingleOrder(order_id);
  orders.then((data) => {
    console.log(data.data);
    console.log(data.data[0].customer_id);
    setFormData(data.data);
  });

  // Moved accessing customer_id and vehicle_id inside the promise resolution
  orders.then((data) => {
    const customerId = data.data[0]?.customer_id;
    const vehicleId = data.data[0]?.vehicle_id;

    const response = customerService.getCustomerById(customerId);
    response.then((data) => {
      setCustomer(data.data.data[0]);
      console.log(data.data.data);
    });

    const vehicle = vehicleService.getVehiclesByVehicleId(vehicleId);
    vehicle.then((data) => {
      setVehicle(data.data.data[0]);
      console.log(data.data.data);
    });
  });

  const services = serviceService.getServices();
  services.then((res) => {
    console.log(res);
    setAllServices(res);
  });
}, [order_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!formData.additional_request) {
      setService_description_required("please enter service description");
      valid = false;
    }
    if (!formData.order_total_price) {
      setPrice_required("please enter price");
      valid = false;
    }
    if (!valid) {
      return;
    }
    try {
      const res = await order_services.createOrder(
        employee_id,
        customer_id,
        vehicle_id,
        { ...formData, order_services: selectedServices }
      );

      toast.success(res.message, {
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
      navigate("/admin/orders");

      // console.log(res);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.message, {
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

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      const isSelected = prevSelectedServices.some(
        (service) => service.service_id === serviceId
      );
      if (isSelected) {
        return prevSelectedServices.filter(
          (service) => service.service_id !== serviceId
        );
      } else {
        return [
          ...prevSelectedServices,
          { service_id: serviceId, service_completed: 0 },
        ];
      }
    });
  };

  

 





  return (
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Edit Order</h1>
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
                <input
                  type="checkbox"
                  name="service_id"
                  onChange={() => toggleServiceSelection(data.service_id)}
                  checked={selectedServices.some(
                    (service) => service.service_id === data.service_id
                  ) }
                  className=" h-5 w-5"
                />
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
              name="additional_request"
              value={formData[0]?.additional_request}
              cols="30"
              rows="10"
              placeholder={
                service_description_required
                  ? service_description_required
                  : "Service Description"
              }
            ></textarea>{" "}
            <br /> <br /> <br />
            <input
              onChange={handleChange}
              className={
                price_required
                  ? "md:w-[680px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                  : "md:w-[680px] py-3 px-5 mb-3 mt-3 input_border"
              }
              type="text"
              placeholder={price_required ? price_required : "Price"}
              name="order_total_price"
              value={formData[0]?.order_total_price}
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

export default EditOrderComponent;
