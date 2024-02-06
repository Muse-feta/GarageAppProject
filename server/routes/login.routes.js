const router = require('express').Router();
const loginController = require('../controller/login.controller');

router.post('/api/employee/login', loginController.login);
module.exports = router