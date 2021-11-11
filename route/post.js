const route = require('express').Router();
const postController = require('../controller/postController');
const commentController = require('../controller/commentController')
const authController = require('../controller/authController');
const likeController = require('../controller/likeController');

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
route.put('/:postId/like',
            authController?.routeProtection,
            likeController?.doLike);
route.put('/:postId/dislike',
            authController?.routeProtection,
            likeController?.disLike);
module.exports = route;