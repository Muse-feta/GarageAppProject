import React, { useEffect, useState } from 'react'
import serviceService from '../../../../services/services.service';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditServiceComponent = () => {
      const [service_name_required, setService_name_required] = useState("");
      const [service_description_required, setService_description_required] =
        useState("");

        const navigate = useNavigate();

         const [formData, setFormData] = useState({
           service_name: "",
           service_description: "",
         });

           const handleChange = (e) => {
             setFormData({
               ...formData,
               [e.target.name]: e.target.value,
             });
           };

           const id = window.location.pathname.split("/")[3];

           useEffect(() => {
             const res = serviceService.getServiceById(id);
             res.then((res) => {
               setFormData(res.data.data[0]);
             })
           }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!formData.service_name) {
      setService_name_required("please enter service name");
      valid = false;
    };
    if (!formData.service_description) {
      setService_description_required("please enter service description");
      valid = false;
    }
    if (!valid) {
      return;
    }

    try {
      const res = await serviceService.editService(formData);
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
    })
    navigate("/admin/services")
    }catch (error) {
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
    <div className=' m-10'>
      <div className=" flex m-3">
        <h1 className=" font-extrabold text-3xl">Edit Service</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>
      <div className=" shadow-lg p-5">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className={
              service_name_required
                ? "md:w-[680px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[680px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={
              service_name_required ? service_name_required : "Service Name"
            }
            name="service_name"
            value={formData.service_name}
          />
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
                : "Service Name"
            }
          ></textarea>{" "}
          <br />
          <div className="link-btn mt-3">
            <button type="submit" className=" bg-red-500 btn-style-one">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditServiceComponent