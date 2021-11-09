const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');

let registration = (req, res) => {
    const newUser = new User({
        name: req.body?.name,
        role: req.body?.role,
        email: req.body?.email,
        password: req.body?.password,
        confirmPassword: req.body?.confirmPassword
    });


    newUser.save()
        .then(data =>{
            return res.json({
                message: 'Registration Successfull',
                data
            })
        })
        .catch(err => {
            return res.json({
                message: 'Error occured',
                err: err?.message
            })
        })
}
const login = (req, res) =>{
    //Email verification and password is not falsy value
    if(!req.body?.password){
        res.json({
            status: 'fail',
            message: 'Enter a valid password'
        })

    }
    //check if Email exist in DB
    User.findOne({email: req.body?.email}).select('+password')
        .then(result =>{
             result.comparePassword(req.body?.password, result?.password)
                .then(passwordMatched =>{
                    if(!passwordMatched){
                        res.json({
                            message: 'Email or password is wrong'
                        })
                    }
                    //If all ok then create and send token :)
                    const token = jwt.sign({id: result?._id}, 'THIS_IS_MY_SECRET_KEY', {expiresIn: '1d'});
                    return res.json({
                        message: 'Login Successful',
                        data: result,
                        token
                    })

                })
                .catch(err =>{
                    return res.json({
                        status: 'fail',
                        message: 'Error occured here'
                    })
                })
        })
        .catch(err =>{
            return res.json({
                status: 'fail',
                message: 'Error occured'
            })
        })


}
const routeProtection = async (req, res, next) =>{
    //1. get token and check whether it's exist
    let token;
    if(req.headers?.authorization?.startsWith('Bearer')){
        token = req.headers?.authorization?.split(' ')[1];
    }
    if(!token){
        return res.json({
            message: 'Please signin first to access'
        })
    }
    //2. verify token
    let decoded;
    try {
        decoded = await util?.promisify(jwt?.verify)(token, 'THIS_IS_MY_SECRET_KEY')
    }
    catch (error){
        if(error.name === 'JsonWebTokenError'){
            return res.json({
                message: 'Invalid token! Please login again'
            })
        }
        if(error.name === 'TokenExpiredError'){
            return res.json({
                message: 'Token expired! Please login again'
            })
        }

    }
    //3. set user in req
    const freshUser = await User.findById(decoded?.id);
    if (!freshUser) {
        return res.json({
            message: 'User not found !'
        })
    }
    req.user = freshUser;
    next();

}
const restrictTo = roles =>{
    return (req, res, next) => {
        if(roles?.includes(req?.user?.role)){
            next();
        }
        else{
            res.json({
                message: 'You are not supposed to do it'
            })
        }
    }
}
module.exports = {
    registration,
    login,
    restrictTo,
    routeProtection,
}