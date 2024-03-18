const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios'

const createEmployee = async (formData, employeeToken) => {
    console.log(formData)
    const res = await axios.post(`${api_url}/employee`, 
    formData,   
     {
      headers: {
        "x-access-token": await employeeToken,
      },
    });
    console.log(employeeToken)
    return res
}

const getAllEmployees = async (employeeToken) => {
  const res = await axios.get(`${api_url}/employees`,
   {
     headers: {
      "x-access-token": employeeToken,
    },
   }
  );
  return res
}

const getEmployeeById = async (employee_id, employeeToken) => {
  const res = await axios.get(`${api_url}/employee/${employee_id}`,
   {
     headers: {
      "x-access-token": employeeToken,
    },
   }
  );
  return res
}

// export default createEmployee
const employeeService = {createEmployee, getAllEmployees, getEmployeeById}
export default employeeService;




