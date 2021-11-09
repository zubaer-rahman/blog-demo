const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const strReq = value =>{
    return {
        type: String,
        required: [true, `${value} is required`]
    }
}

const UserSchema = new mongoose.Schema({
    name: strReq('Name'),
    email: {
        ...strReq('Email'),
        unique: true,
        validate: {
            validator: function(value){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);  
            },
            message: 'Invalid email'
        }
    },
    password: {
        ...strReq('Password'),
        select: false
    },
    confirmPassword: {
        ...strReq('Confirm Password'),
        select: false,
        validate: {
            validator: function(value){
                 if(value === this.password) return true
                 else return false
            },
            message: "Password doesn't match"
        }

    },
    role: {
        ...strReq('Role'),
        enum: ['ADMIN', 'MANAGER']
    }
},{
    timestamps: true
})


UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 12)
        .then(res => {
            this.password = res;
            this.confirmPassword = "";
            next();
        })
        .catch(err => console.log(err))
    
})

UserSchema.methods.comparePassword = async function (candidatePassword, DBpassword){
    let result = await bcrypt.compare(candidatePassword, DBpassword);
    return result;
}

const User = mongoose.model('User', UserSchema);

module.exports = User; 