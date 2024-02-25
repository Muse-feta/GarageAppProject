const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios'

const createEmployee = async (formData, employeeToken) => {
    console.log(formData)
    const res = await axios.post(`${api_url}/employee`, 
    formData,   
     {
      headers: {
        "x-access-token": employeeToken,
      },
    });
    console.log(employeeToken)
    return res
}

// export default createEmployee
const employeeService = {createEmployee}
export default employeeService;




