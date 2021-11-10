const Post = require('../Model/Post');
const Comment = require('../Model/Comment');


let createComment = (req, res) =>{

    //create Post
    //find Post associated with this comment
    //update Post


    let postId = req.params.postId; 

    const newComment = new Comment ({
        body: req.body?.body
    });

    newComment.save()
        .then(CommentData => {
            //find Post
            //Update Post
            Post.findById(postId)
                .then(post => {
                    post.comments.push(CommentData?.id);
                    Post.findOneAndUpdate({_id: postId}, {$set: post}, {new: true})
                        .then(() => {
                            return res.json({
                                message: 'Comment Created Successfully'
                            })
                        })
                        .catch(err => {
                            return res.json({
                                message: 'Error occurred!',
                                err: err?.message 
                            })                           
                        })
                })
                .catch(err =>{
                    return res.json({
                        message: 'Error occurred!',
                        err: err?.message 
                    })   
                })
        })
        .catch(err => {
            return res.json({
                message: 'Error occurred!',
                err: err?.message 
            })
        })
        
}
let getAllComment = (req, res) => {
    Comment.find()
       .then(data => {
           Comment.count()
           .then(totalCount => {
               res.json ({
                   total: totalCount,
                   data
               })
           })
           .catch(err => {
               res.json({
                   err
               })
           })
       })
       .catch(err => {
           return res.json({
               err
           })
       })
}
let updateCommentById = (req, res) =>{
    let {id} = req.params;
    Comment.findByIdAndUpdate(id, req.body, {new: true})
        .then(data =>{
            res.json({
                message: 'Comment updated successfully',
                data
            })
        })
        .catch(err =>{
            res.json({
                err
            })
        })
}


module.exports = {
    createComment,
    getAllComment,
    updateCommentById,
}