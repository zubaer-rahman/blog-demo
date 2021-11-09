const Post = require('../Model/Post');


let createPost = (req, res) =>{
    const newPost = new Post ({
        title: req.body?.title || '',
        body: req.body?.body
    });
    newPost.save()
    .then(data => {
        return res.json({
            message: 'Post created successfully',
            data
        })
    })
    .catch(err => {
         return res.json({
             message: 'Error occurred!',
             err: err?.message 
         })
    })
        
}


let getAllPost = (req, res) => {
    Post.find()
       .then(data => {
           Post.count()
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


let getPostById = (req, res) => {
    let { id } = req.params;
    Post.findById(id).populate('comments')
        .then(data => {
            return res.json({
                data
            })
        })
        .catch(err =>{
            res.json({
                err
            })
        })
}


let updatePostById = (req, res) =>{
    let {id} = req.params;
    Post.findByIdAndUpdate(id, req.body, {new: true})
        .then(data =>{
            res.json({
                message: 'Post updated successfully',
                data
            })
        })
        .catch(err =>{
            res.json({
                err
            })
        })
}


let deletePostById = (req, res) =>{
    let {id} = req.params;
    Post.findByIdAndDelete(id)
    .then(data =>{
        res.json({
            message: 'Deleted successfully'
        })
    })
    .catch(err => {
        res.json({
            message: err
        })
    })
}
 

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePostById,
    deletePostById,
}