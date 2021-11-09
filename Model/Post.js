const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const strReq = (value, isRequired) => {
    return {
        type: String,
        required: [isRequired, `${value} is required`]
    }
}
const postSchema = new Schema({
    title: {
        ...strReq('Title', false),
        maxlength: 100
    },
    body: strReq('Body', true), 
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
}) 

const Post = mongoose.model('Post', postSchema);
module.exports = Post;