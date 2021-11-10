const route = require('express').Router();
const commentController = require('../controller/commentController')
const authController = require('../controller/authController');

route.patch('/:id', commentController?.updateCommentById);
route.get('/', commentController?.getAllComment )
module.exports = route;