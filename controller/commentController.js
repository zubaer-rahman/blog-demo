const Post = require('../Model/Post');
const Comment = require('../Model/Comment');


let createComment = (req, res) =>{

    //create post
    //find post associated with this comment
    //update post


    let postId = req.params.postId;

    const newComment = new Comment ({
        body: req.body?.body
    });

    newComment.save()
        .then(CommentData => {
            //find Post
            //Update post 
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


module.exports = {
    createComment,
}