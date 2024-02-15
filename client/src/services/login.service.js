import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const login = async (formData) => {
    const res = await axios.post(`${api_url}/employee/login`, formData);
    return res;
}

const loginService = {login}
export default loginService