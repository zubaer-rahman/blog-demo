const Post = require('../Model/Post');


// @route PUT api/post/:postId/like
// @desc Like a Post
// @access private

let doLike = async (req, res) =>{
    try{
        const post = await Post.findById (req.params.postId); 

        //check the post if already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

            return res.status(400).json({msg: 'Post already been liked'});

        }

        post.likes.unshift({user: req.user?.id});

        await post.save();

        res.json(post.likes);
 
    }catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');

    }
    
     
}


let disLike = async (req, res) =>{
    try{
        const post = await Post.findById (req.params.postId); 

        //check the post if already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {

            return res.status(400).json({msg: 'Post has not yet been liked'});

        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user?.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
 
    }catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');

    }
    
}

module.exports = {
    doLike,
    disLike
}