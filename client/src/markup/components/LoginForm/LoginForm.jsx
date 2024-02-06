import React from 'react'

const LoginForm = () => {
  return (
    <div className=" ml-[20%] m-11">
      <div>
        <div className="flex">
          <h1 className=" font-extrabold text-3xl">Login To Your Account</h1>
          <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
        </div>

        <form action="">
          <input
            className="md:w-[480px] py-3 px-5 mb-3 mt-3 input_border w-[250px] "
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className=" md:w-[480px] py-3 px-5 input_border w-[250px] "
            type="password"
            placeholder="Password"
          />

          <div className="link-btn mt-3">
            <a href="/login" className="theme-btn btn-style-one">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm