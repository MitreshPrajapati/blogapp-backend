const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const Connection = mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

module.exports = { Connection };