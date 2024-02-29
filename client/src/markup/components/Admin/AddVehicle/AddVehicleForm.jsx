import React, { useState } from 'react'
import { useAuth } from '../../../../context/AuthContext';
import vehicleService from '../../../../services/vehicle.service';
import { toast, Bounce } from "react-toastify";

const AddVehicleForm = ({customer_id}) => {

     var employeeToken = "";
     const { employee } = useAuth();
     if (employee && employee.token) {
       employeeToken = employee.token;
     }

    const [vehicleData, setVehicleData] = useState({
      customer_id: customer_id,
      vehicle_model: "",
      vehicle_make: "",
      vehicle_type: "",
      vehicle_year: "",
      vehicle_mileage: "",
      vehicle_tag: "",
      vehicle_serial: "",
      vehicle_color: "",
    });
    const [vehicle_model_required, setVehicleModelRequired] = useState(false);
    const [vehicle_year_required, setVehicleYearRequired] = useState(false);
    const [vehicle_make_required, setVehicleMakeRequired] = useState(false);
    const [vehicle_type_required, setVehicleTypeRequired] = useState(false);
    const [vehicle_mileage_required, setVehicleMileageRequired] = useState(false);
    const [vehicle_tag_required, setVehicleTagRequired] = useState(false);
    const [vehicle_serial_required, setVehicleSerialRequired] = useState(false);
    const [vehicle_color_required, setVehicleColorRequired] = useState(false);

    const handleChange = (event) => {
      setVehicleData({
        ...vehicleData, //spread operator
        [event.target.name]: event.target.value,
      })
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
       let valid = true;
        if (!vehicleData.vehicle_model) {
          setVehicleModelRequired("please enter vehicle model");
          valid = false;
        } else {
          setVehicleModelRequired("");
        }

        if (!vehicleData.vehicle_make) {
          setVehicleMakeRequired("please enter vehicle make");
          valid = false;
        } else {
          setVehicleMakeRequired("");
        }

        if (!vehicleData.vehicle_type) {
          setVehicleTypeRequired("please enter vehicle type");
          valid = false;
        } else {
          setVehicleTypeRequired("");
        }

        if (!vehicleData.vehicle_year) {
          setVehicleYearRequired("please enter vehicle year");
          valid = false;
        } else {
          setVehicleYearRequired("");
        }

        if (!vehicleData.vehicle_mileage) {
          setVehicleMileageRequired("please enter vehicle mileage");
          valid = false;

        } else {
          setVehicleMileageRequired("");
        }

        if (!vehicleData.vehicle_tag) {
          setVehicleTagRequired("please enter vehicle tag");
          valid = false;
        } else {
          setVehicleTagRequired("");
        }

        if (!vehicleData.vehicle_serial) {
          setVehicleSerialRequired("please enter vehicle serial");
          valid = false;
        } else {
          setVehicleSerialRequired("");
        }

        if (!vehicleData.vehicle_color) {
          setVehicleColorRequired("please enter vehicle color");
          valid = false;
        } else {
          setVehicleColorRequired("");
        }

        if (!valid) {
          return;
        }

        try {
             const response = await vehicleService.addVehicle(
               vehicleData,employeeToken
             );
console.log(response);

        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className={
            vehicle_model_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_model_required ? vehicle_model_required : "Vehicle model"
          }
          name="vehicle_model"
          value={vehicleData.vehicle_model}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_make_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_make_required ? vehicle_make_required : "Vehicle make"
          }
          name="vehicle_make"
          value={vehicleData.vehicle_make}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_type_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_type_required ? vehicle_type_required : "Vehicle type"
          }
          name="vehicle_type"
          value={vehicleData.vehicle_type}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_year_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_year_required ? vehicle_year_required : "Vehicle year"
          }
          name="vehicle_year"
          value={vehicleData.vehicle_year}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_mileage_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_mileage_required
              ? vehicle_mileage_required
              : "Vehicle mileage"
          }
          name="vehicle_mileage"
          value={vehicleData.vehicle_mileage}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_tag_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_tag_required
              ? vehicle_tag_required
              : "Vehicle tag"
          }
          name="vehicle_tag"
          value={vehicleData.vehicle_tag}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_serial_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_serial_required ? vehicle_serial_required : "Vehicle serial"
          }
          name="vehicle_serial"
          value={vehicleData.vehicle_serial}
        />{" "}
        <br />
        <input
          onChange={handleChange}
          className={
            vehicle_color_required
              ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
              : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
          }
          type="text"
          placeholder={
            vehicle_color_required ? vehicle_color_required : "Vehicle color"
          }
          name="vehicle_color"
          value={vehicleData.vehicle_color}
        />{" "}
        <br />
        <div className="link-btn mt-3">
          <button type="submit" className=" bg-red-500 btn-style-one">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVehicleForm