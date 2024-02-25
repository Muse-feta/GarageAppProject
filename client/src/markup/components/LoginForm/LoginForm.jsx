import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import loginService from "../../../services/login.service";
import { toast, Bounce } from "react-toastify";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    employee_email: "",
    employee_password: "",
  });

  

  

  const [email_required, set_email_required] = useState("");
  const [password_required, set_password_required] = useState("");
  const [server_error, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  let valid = true;
  // const employeeToken = getAuth();
  // console.log(employeeToken.token.employee_token);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm, //spread operator
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    valid = true;
    if (!loginForm.employee_email) {
      set_email_required("please enter email to continue");
      valid = false;
    } else if (!loginForm.employee_email.includes("@")) {
      set_email_required("please enter valid email to continue");
      valid = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(loginForm.employee_email)) {
        set_email_required("please enter valid email to continue");
        valid = false;
      } else {
        set_email_required("");
      }
    }
    // password validation
    if (!loginForm.employee_password) {
      set_password_required("please enter password to continue");
      valid = false;
    } else {
      set_password_required("");
    }

    if (!valid) {
      return;
    }

    try {
      const response = await loginService.login(loginForm);
      console.log(response);
      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        toast.success("Login Succesfully", {
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
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
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
    <div className=" ml-[20%] m-11">
      <div>
        <div className="flex">
          <h1 className=" font-extrabold text-3xl">Login To Your Account</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className={
              email_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="email"
            placeholder={email_required ? email_required : "Employee email"}
            name="employee_email"
            value={loginForm.employee_email}
            onChange={handleChange}
          />
          <br />
          <input
            className={
              password_required
                ? "md:w-[480px] bg-[#fce9ef] border-red-200 py-3 px-5 mb-3 mt-3 input_border"
                : "md:w-[480px] py-3 px-5 mb-3 mt-3 input_border"
            }
            type="password"
            placeholder={
              password_required ? password_required : "Employee email"
            }
            name="employee_password"
            value={loginForm.employee_password}
            onChange={handleChange}
          />

          <div className="link-btn mt-3">
            <button className="theme-btn btn-style-one">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
