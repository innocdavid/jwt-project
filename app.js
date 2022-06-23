// modules
const express = require('express');
const morgan = require('morgan');
const httpError = require('http-errors');
require('dotenv').config();

// intializing app
const app = express();

// route
app.get('/', async (req, res) => {
  res.send('Welcome to this server');
});

// ERROR MIDDLEWARE
app.use(async(req, res, next) => {
  // const error = new Error('Not Found');
  // error.status = 404;
  // next(error);
  next(httpError.NotFound());
});
app.use(async(err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    err: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// PORT AND HOSTNAME
const PORT =  process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME;

// server
app.listen(PORT, HOSTNAME, () => {
  console.log(`server listening at http://${HOSTNAME}:${PORT}`);
});