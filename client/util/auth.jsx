import { jwtDecode } from "jwt-decode";
const getAuth = async () => {
  const token =  localStorage.getItem("token")
  if (token) {
    const decodedToken =   jwtDecode(token);
    return {decodedToken, token};
  } else {
    return null;
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
}

export default getAuth;
