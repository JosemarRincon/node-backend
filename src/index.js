const express = require('express');
const path = require('path');
const cors = require('cors');


console.log(process.env.MONGO_URL);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
console.log(process.env.MONGO_URL);

const mongoose = require('mongoose');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  });

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));


server.listen(process.env.PORT || 3333);
