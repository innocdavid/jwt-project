// modules
const express = require('express');
const morgan = require('morgan');
const httpError = require('http-errors');
require('dotenv').config();
require('./config/mongdb')

// intializing app
const app = express();

// routers
const authRoute = require('./routes/auth')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// route
app.get('/', async (req, res) => {
  res.send('Welcome to this server');
});

app.use('/auth', authRoute);

// ERROR MIDDLEWARE
app.use(async(req, res, next) => {
  // const error = new Error('Not Found');
  // error.status = 404;
  // next(error);
  next(httpError.NotFound());
});
app.use((err, req, res, next) => {
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

// !test
if (process.env.NODE_ENV !== 'test') { 
  // server
  app.listen(PORT, HOSTNAME, () => {
    console.log(`server listening at http://${HOSTNAME}:${PORT}`);
  });
  
}

// exporting
module.exports = app;