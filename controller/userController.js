const User = require('../Model/User');

let getAllUser = (req, res) => {
     User.find()
        .then(data => {
            User.count()
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


let getUserById = (req, res) => {
    let { id } = req.params;
    User.findById(id)
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


let getUserByAnything = (req, res) => {
    User.findOne(req.body)
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


let deleteUserById = (req, res) =>{
    let {id} = req.params;
    User.findByIdAndDelete(id)
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


let updateUserById = (req, res) =>{
    let {id} = req.params;
    User.findByIdAndUpdate(id, req.body, {new: true})
        .then(data =>{
            res.json({
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
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByAnything,
}