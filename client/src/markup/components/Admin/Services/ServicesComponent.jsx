import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import serviceService from '../../../../services/services.service';
import { toast, Bounce } from "react-toastify";


const ServicesComponent = () => {
  const [Allservices, setAllServices] = useState([])
  const [service_name_required, setService_name_required] = useState('')
  const [service_description_required, setService_description_required] = useState('')

  const [formData, setFormData] = useState({
    service_name: '', 
    service_description: ''
  });

  useEffect(() => {
      const res = serviceService.getServices();
      res.then((res) => {
        console.log(res)
        setAllServices(res)
      })  
  },[ formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!formData.service_name) {
      setService_name_required('please enter service name');
      valid = false;
    }
    if (!formData.service_description) {
      setService_description_required('please enter service description');
      valid = false;
    }
    if (!valid) {
      return
    }
    try {
      const res = await serviceService.addService(formData);
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
        window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await serviceService.deleteService(id);
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
    <div className=" m-10">
      <div className=" flex">
        <h1 className=" font-extrabold text-3xl">Services We Provide</h1>
        <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
      </div>

      <div className=" mt-3 opacity-70">
        <p>
          Bring the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </p>
      </div>

      {Allservices?.map((data) => (
        <>
          <div className=" shadow-md px-4 py-3 mt-5 flex justify-between">
            <div>
              <h1 className="mb-2 font-extrabold text-xl">
                {data.service_name}
              </h1>
              <h1>{data.service_description}</h1>
            </div>

            <div className=" flex justify-end items-end gap-2">
              <Link className=" text-xl" to={`/admin/edit-service/${data.service_id}`}>
                <FaEdit />
              </Link>
              <Link
                className=" text-xl"
                onClick={() => handleDelete(data.service_id)}
              >
                <MdDeleteForever />
              </Link>
            </div>
          </div>
        </>
      ))}

      <div className=" mt-7 p-5 shadow-lg">
        <div className=" flex">
          <h1 className=" font-extrabold text-3xl">Add a new service</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>

        <div className="">
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
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent