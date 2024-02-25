import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import employeeService from "../../../../services/employee.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const AddEmployeeForm = () => {
  var employeeToken = ""
  const {employee} = useAuth();
  if(employee && employee.token){
    employeeToken = employee.token
  }
  const [employeeData, setEmployeeData] = useState({
    employee_email: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    employee_password_hashed: "",
    active_employee: 1,
    company_role_id: 1,
  });
  const [email_required, setEmailRequired] = useState("");
  const [password_required, setPasswordRequired] = useState("");
  const [server_error, setServerError] = useState("");
  const [phone_required, setPhoneRequired] = useState("");
  const [first_name_required, setFirstNameRequired] = useState("");
  const [last_name_required, setLastNameRequired] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const navigate = useNavigate();


  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if(!employeeData.employee_email){
     setEmailRequired("please enter email to continue")
      valid = false
    }else if(!employeeData.employee_email.includes("@")){
      setEmployeeData({
        ...employeeData, employee_email: "",
      })
     setEmailRequired("please enter valid email to continue")
      valid = false
    }else{
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(employeeData.employee_email)){
        setEmployeeData({
          ...employeeData, employee_email: "",
        })
      setEmailRequired("please enter valid email to continue")
        valid = false
      }else{
        setEmailRequired("")
      }
    }
    //password validation 
    if(!employeeData.employee_password_hashed ){
      setPasswordRequired("please enter password to continue")
      valid = false
    }else if (employeeData.employee_password_hashed.length < 8) {
      setEmployeeData({
        ...employeeData, employee_password_hashed: "",
      })
      setPasswordRequired("password must be more than 8 characters")
      valid = false
    }else{
      setPasswordRequired("")
    }

    if(!employeeData.employee_first_name){
      setFirstNameRequired("please enter first name")
      valid = false
    }else{
      setFirstNameRequired("")
    }
    // last name validation
    if(!employeeData.employee_last_name){
      setLastNameRequired("please enter last name")
      valid = false
    }else{
      setLastNameRequired("")
    }

    // phone number validation
    if(!employeeData.employee_phone){
      setPhoneRequired("please enter phone number")
      valid = false
    }else{
      setPhoneRequired("")
    }

    if(!valid){
      return
    }

    try {
      const resData = await employeeService.createEmployee(
        employeeData,
        employeeToken
      );
       setServerSuccess(resData.data.message)
      setSuccess(resData);
      toast.success(resData.data.message, {
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
      navigate('/')
    } catch (error) {
      console.log(error)
      setServerError(error.response.data.error)
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

  return (
    <div className=" my-11 ml-[100px]">
      <div>
        <div className=" flex">
          <h1 className=" font-extrabold text-3xl">Add a new employee</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* {server_error && <div className="text-red-500">{server_error}</div>} */}
          {/* {serverSuccess && <div className="text-green-500">{success.data.message}</div>} */}

          <input
            onChange={handleChange}
            className={
              email_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={email_required ? email_required : "Employee email"}
            name="employee_email"
            value={employeeData.employee_email}
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
              first_name_required ? first_name_required : "Employee first Name"
            }
            name="employee_first_name"
            value={employeeData.employee_first_name}
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
              last_name_required ? last_name_required : "Employee last Name"
            }
            name="employee_last_name"
            value={employeeData.employee_last_name}
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
              phone_required ? phone_required : "Employee Phone Number"
            }
            name="employee_phone"
            value={employeeData.employee_phone}
          />
          <br />
          <select
            className="border py-3 px-5  md:w-[480px]  appearance-none rounded mt-3 text-[#302e2e]"
            onChange={handleChange}
            value={employeeData.company_role_id}
            name="company_role_id"
          >
            <option value={1}>Employee</option>
            <option value={2}>Manager</option>
            <option value={3}>Admin</option>
          </select>
          <br />
          <input
            onChange={handleChange}
            className={
              password_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="text"
            placeholder={
              password_required ? password_required : "Employee Password"
            }
            name="employee_password_hashed"
            value={employeeData.employee_password_hashed}
          />
          <br />
          <div className="link-btn mt-3">
            <button type="submit" className=" bg-red-500 btn-style-one">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
