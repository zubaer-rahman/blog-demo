const route = require('express').Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const checkEmailMiddleware = require('../middleware/emailChecker');
const sayHelloMiddleware = require('../middleware/sayHello')


route.post('/search', userController?.getUserByAnything)
route.get('/', userController?.getAllUser)
route.get('/:id', userController?.getUserById)
route.patch('/:id', userController?.updateUserById)
route.delete('/:id', 
            authController?.routeProtection,
            authController?.restrictTo(['ADMIN', 'MANAGER']),
            userController?.deleteUserById
);
  
module.exports = route;