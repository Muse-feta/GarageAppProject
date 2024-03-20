import React, { useEffect, useState } from "react";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import vehicleService from "../../../../services/vehicle.service";
import serviceService from "../../../../services/services.service";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";
import order_services from "../../../../services/orders.service";

const ViewOrderComonent = () => {
  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const [customer_id, setCustomerId] = useState("");
  const [vehicle_id, setVehicleId] = useState("");
  const [vehicle, setVehicle] = useState([]);
  const [service, setService] = useState([]);
  const { employee } = useAuth();
  const employee_id = employee?.decodedToken?.employee_id;
  const order_id = window.location.pathname.split("/")[3];
  // console.log(order_id)
  // console.log(customer_id)
  console.log(order)

 
useEffect(() => {
  const response = order_services.getSingleOrder(order_id);
  response.then((data) => {
    setOrder(data.data);
    setCustomerId(data.data[0]?.customer_id);
    setVehicleId(data.data[0]?.vehicle_id);
    console.log(data);
  });

   

}, [])

 useEffect(() => {
   const response2 = customerService.getCustomerById(customer_id);
   response2.then((data) => {
     setCustomer(data.data.data[0]);
     console.log(data.data.data);
   });

   const vehicle = vehicleService.getVehiclesByVehicleId(vehicle_id);
   vehicle.then((data) => {
     setVehicle(data.data.data[0]);
     console.log(data.data.data);
   });

   // Check if all services are completed and additional requests are completed
   const allServicesCompleted = order.every(
     (item) => item.service_completed === 1
   );
   const additionalRequestsCompleted =
     order[0]?.additional_requests_completed === 1;

   if (allServicesCompleted && additionalRequestsCompleted) {
     // Update order status to 1
     const updateOrderStatusResponse = order_services.updateOrderStatus(
       order_id,
       1
     );
     updateOrderStatusResponse
       .then((data) => {
         // Assuming your updateOrderStatus function returns updated data
         console.log(data);
         // Update the order state to reflect the changes
         setOrder((prevOrder) =>
           prevOrder.map((item) => ({ ...item, order_status: 1 }))
         );
       })
       .catch((error) => {
         // Handle error here
         console.error("Error updating order status:", error);
       });
   }
   if (!allServicesCompleted || !additionalRequestsCompleted) {
     // Update order status to 1
     const updateOrderStatusResponse = order_services.updateOrderStatus(
       order_id,
       0
     );
     updateOrderStatusResponse
       .then((data) => {
         // Assuming your updateOrderStatus function returns updated data
         console.log(data);
         // Update the order state to reflect the changes
         setOrder((prevOrder) =>
           prevOrder.map((item) => ({ ...item, order_status: 1 }))
         );
       })
       .catch((error) => {
         // Handle error here
         console.error("Error updating order status:", error);
       });
   }
 }, [customer_id, vehicle_id, order]);

const handleCheckboxChange = (order_id, service_id, currentStatus) => {
  const updatedStatus = currentStatus === 0 ? 1 : 0; // Toggle the status

  const res = order_services.updateOrderServiceCompleted(
    order_id,
    service_id
  );
  res
    .then((data) => {
      // Assuming your updateOrderServiceCompleted function returns updated data
      console.log(data);

      // If successful, update the order state to reflect the changes
      setOrder((prevOrder) =>
        prevOrder.map((item) =>
          item.order_id === order_id && item.service_id === service_id
            ? { ...item, service_completed: updatedStatus }
            : item
        )
      );

      // Show a toast notification or perform any other action to indicate success
     
    })
    .catch((error) => {
      // Handle error here
      console.error("Error updating service status:", error);
      // Show a toast notification or perform any other action to indicate failure
     
    });
};

const handleCheckboxChangeAdditionalRequest = (order_id,  currentStatus) => {
  const updatedStatus = currentStatus === 0 ? 1 : 0; // Toggle the status

  const res = order_services.updateOrderAdditionalRequest(
    order_id
  );
  res
    .then((data) => {
      // Assuming your updateOrderServiceCompleted function returns updated data
      console.log(data);

      // If successful, update the order state to reflect the changes
      setOrder((prevOrder) =>
        prevOrder.map((item) =>
          item.order_id === order_id
            ? { ...item, additional_requests_completed: updatedStatus }
            : item
        )
      );  

      // Show a toast notification or perform any other action to indicate success
     
    })
    .catch((error) => {
      // Handle error here
      console.error("Error updating service status:", error);
      // Show a toast notification or perform any other action to indicate failure
     
    });
}

  return (
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Single Order</h1>
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

      <div>
        {order.map((data) => (
          <div className=" shadow-md px-4 py-3 mt-5 flex justify-between">
            <div>
              <h1 className="mb-2 font-extrabold text-xl">
                {data.service_name}
              </h1>
              <h1>{data.service_description}</h1>
              <h1>
                {" "}
                {data.service_completed === 0 ? (
                  <h1 className=" bg-[#ffc83c] rounded-md text-center font-bold w-[130px] mt-3">
                    In Progress
                  </h1>
                ) : (
                  <h1 className=" bg-[#00ff00] rounded-md text-center font-bold w-[130px] mt-3">
                    Completed
                  </h1>
                )}
              </h1>
            </div>

            <div className=" flex justify-end items-end gap-2">
              <input
                className="h-6 w-6"
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange(
                    data.order_id,
                    data.service_id,
                    data.service_completed
                  )
                }
                checked={data.service_completed === 1 ? true : false}
              />
            </div>
          </div>
        ))}
        <div className=" shadow-md px-4 py-3 mt-5 flex justify-between">
          <div>
            <h1 className="mb-2 font-extrabold text-xl">Additional Request</h1>
            <h1>{order[0]?.additional_request}</h1>
            <h1>
              {" "}
              {order[0]?.additional_requests_completed === 0 ? (
                <h1 className=" bg-[#ffc83c] rounded-md text-center font-bold w-[130px] mt-3">
                  In Progress
                </h1>
              ) : (
                <h1 className=" bg-[#00ff00] rounded-md text-center font-bold w-[130px] mt-3">
                  Completed
                </h1>
              )}
            </h1>
          </div>

          <div className=" flex justify-end items-end gap-2">
            <input
              className="h-6 w-6"
              type="checkbox"
              onChange={() =>
                handleCheckboxChangeAdditionalRequest(
                  order[0]?.order_id,
                  order[0].additional_requests_completed
                )
              }
              checked={
                order[0]?.additional_requests_completed === 1 ? true : false
              }
            />
          </div>
        </div>

        <Link
          to={"/admin/orders"}
          className=" bg-red-500 btn-style-one rounded-xl mt-5  "
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewOrderComonent;
