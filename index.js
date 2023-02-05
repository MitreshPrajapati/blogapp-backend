const express = require('express');
const cors = require('cors');
const { Connection } = require('./Config/db');

//middlewares
const { authentication } = require('./Middlewares/authentication');

//routes
const { authRouter } = require('./Routes/Auth.route');
const { blogPostRouter } = require('./Routes/BlogPost.route');
const { userRouter } = require('./Routes/User.route');


const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();


app.get('/', (req, res) => {
    res.send("Welcome to Blog App");
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog',authentication, blogPostRouter);


const PORT = process.env.PORT || 7070
app.listen(PORT, async()=>{
    try{
        await Connection;
        console.log(`listening on PORT ${PORT} `)
    }catch(err){
        console.log('connection failed');
        console.log(err);
    }
})