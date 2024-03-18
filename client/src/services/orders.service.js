const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";


const createOrder = async (employee_id, customer_id, vehicle_id, formData) => {
    const res = await axios.post(`${api_url}/order`, { employee_id, customer_id, vehicle_id, ...formData });
    return res.data;
};

const getAllOrders = async () => {
  const res = await axios.get(`${api_url}/orders`);
  return res.data;
};

const getSingleOrder = async (order_id) => {
  const res = await axios.get(`${api_url}/order/${order_id}`);
  return res.data;
};


const order_services = {
    createOrder,
    getAllOrders,
    getSingleOrder
};

export default order_services;
