const express = require('express');
const cors = require('cors');
const { Connection } = require('./Config/db');
const bodyParser = require('body-parser');
//middlewares
const { authentication } = require('./Middlewares/authentication');

//routes
const { authRouter } = require('./Routes/Auth.route');
const { blogPostRouter } = require('./Routes/BlogPost.route');
const { userRouter } = require('./Routes/User.route');
const { porfileUrlRouter } = require('./Routes/ProfileUrl');


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use('/profileUrl',porfileUrlRouter);


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