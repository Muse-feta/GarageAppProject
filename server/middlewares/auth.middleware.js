require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  // console.log("this is token",token);
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }
  // Extract the JWT from the nested structure
  const employeeToken = JSON.parse(token).employee_token;
  jwt.verify(employeeToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to authenticate token" });
    }
    req.employee_role = decoded.employee_role;
    next();
  });
}

const isAdmin = async (req, res, next) => {
        const token = req.headers["x-access-token"];
        if(req.employee_role === 3){
            next()
        }else {
            return res.status(403).json({success: false, message: 'You are not Admin to perform this action'})
        }
}

const auth_middleware = {
    verifyToken,
    isAdmin
};

module.exports = auth_middleware