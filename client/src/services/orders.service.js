const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";


const createOrder = async (employee_id, customer_id, vehicle_id, formData) => {
    const res = await axios.post(`${api_url}/order`, { employee_id, customer_id, vehicle_id, ...formData });
    return res.data;
}


const order_services = {
    createOrder
};

export default order_services;
