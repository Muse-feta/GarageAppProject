const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

const getVehiclesByCustomerId = async (customer_id, employeeToken) => {
    const res = await axios.get(
        `${api_url}/vehicles/${customer_id}`,
        {
            headers: {
                "x-access-token": employeeToken,
            },
        }
    );
    return res;
}

const addVehicle = async (vehicleData, employeeToken) => {
    const res = await axios.post(
        `${api_url}/vehicle`,
        vehicleData,
        {
            headers: {
                "x-access-token": employeeToken,
            }
        }
    )
    return res
}

const vehicleService = { getVehiclesByCustomerId, addVehicle };
export default vehicleService