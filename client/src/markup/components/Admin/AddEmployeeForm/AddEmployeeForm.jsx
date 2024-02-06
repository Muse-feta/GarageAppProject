import React from 'react'

const AddEmployeeForm = () => {
  return (
    <div className=" my-11 ml-[100px]">
      <div>
        <div className=' flex'>
          <h1 className=" font-extrabold text-3xl">Add a new employee</h1>
          <h1 className=' w-11 mt-[-10px] border-b-2 border-red-500'></h1>
        </div>

        <form action="">
          <input
            className="md:w-[480px] py-3 px-5 mb-3 mt-3 input_border "
            type="text"
            placeholder="Employee Email"
          />
          <br />
          <input
            className=" input_border  md:w-[480px] py-3 px-5 "
            type="text"
            placeholder="Employee First Name"
          />
          <br />
          <input
            className=" input_border  md:w-[480px] py-3 px-5 mt-3"
            type="text"
            placeholder="Employee last Name"
          />
          <br />
          <input
            className=" input_border  md:w-[480px] py-3 px-5 mt-3"
            type="text"
            placeholder="Employee Phone 09-00-00-00-00"
          />
          <br />
          <select className="border py-3 px-5  md:w-[480px]  appearance-none rounded mt-3 text-[#302e2e]">
            <option>Employee</option>
            <option>Manager</option>
            <option>Intern</option>
          </select>{" "}
          <br />
          <input
            className=" input_border  md:w-[480px] py-3 px-5 mt-3"
            type="text"
            placeholder="Employee Password"
          />
          <br />
          <div className="link-btn mt-3">
            <a href="/login" className="theme-btn btn-style-one">
              ADD EMPLOYEE
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm