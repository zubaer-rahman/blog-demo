const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const strReq = (value, isRequired) => {
    return {
        type: String,
        required: [isRequired, `${value} is required`]
    }
}
const commentSchema = new Schema({
    body: strReq('Body', true)
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;