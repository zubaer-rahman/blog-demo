const route = require('express').Router();
const postController = require('../controller/postController');
const commentController = require('../controller/commentController')
const authController = require('../controller/authController');

route.post('/', postController?.createPost)
route.get('/', postController?.getAllPost)
route.get('/:id', postController?.getPostById)
route.patch('/:id', postController.updatePostById)
route.delete('/:id', 
            authController?.routeProtection,
            authController?.restrictTo(['ADMIN', 'MANAGER']),
            postController.deletePostById
);

route.post('/:postId/comment', commentController?.createComment);
 
module.exports = route;