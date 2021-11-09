const route = require('express').Router();
const authController = require('../controller/authController')
const checkEmailMiddleware = require('../middleware/emailChecker')


route.post('/signup', checkEmailMiddleware, authController?.registration);
route.post('/signin', checkEmailMiddleware, authController?.login);

module.exports = route;