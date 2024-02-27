const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

const createCustomer = async (formData, customerToken) => {
    const res = await axios.post(`${api_url}/customer`, formData, {
      headers: {
        "x-access-token": customerToken,
      },
    });
    return res;
};

const customerService = {
    createCustomer,
}

export default customerService
