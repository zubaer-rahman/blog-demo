


const checkEmailMiddleware = (req, res, next) => {
    const {email} = req?.body;
    if(email) {
        if(email.includes('@')){
            next();
        }
        else{
            return res.json({
                message: "Please enter a valid email"
            })
        }

    }
    else {
        return res.json({
            message: "Enter the email"
        })
    }
} 

module.exports = checkEmailMiddleware;