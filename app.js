const express = require('express')
const userRoute  = require('./route/user')
const postRoute  = require('./route/post');
const authRoute  = require('./route/auth');
const mongoose   = require("mongoose");

const app = express();
app.use(express.json());

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/auth', authRoute);



app.listen(3000, () => {
    console.log('App On fire');

    mongoose.connect('mongodb://localhost:27017/zubudb',{
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true
    }, () => {
        console.log('database connected successfully');
    });
})