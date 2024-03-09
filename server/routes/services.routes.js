// import express module
const express = require("express");
// import router from express
const router = express.Router();
//import employee cotroller from controller folder
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const servicesController = require("../controller/service.controller");

router.post(
  "/api/service",
//   [verifyToken, isAdmin],
  servicesController.createService
);

router.get(
  "/api/services",
  //   [verifyToken, isAdmin],
  servicesController.getAllServices
);

router.get("/api/service/:service_id", servicesController.getServiceById);

router.put(
  "/api/service/:service_id",
  //   [verifyToken, isAdmin],
  servicesController.updateService
);

router.delete("/api/service/:service_id", servicesController.deleteService);

// export the router
module.exports = router;
