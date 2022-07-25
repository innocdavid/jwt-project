// modules
const httpError = require('http-errors'); 
const express = require('express'); 
const router = express.Router();


// model
const User = require('../models/users');
const { registerSchema } = require('../config/validation_schema')

// register route
router.post('/register', async (req, res, next) => {
  try {
    // const  { email, password } = req.body;
    // if (!email || !password) throw httpError.BadRequest();

    const result = await registerSchema.validateAsync(req.body);

    const emailExists = await User.findOne({ email: result.email });
    if (emailExists) throw httpError.Conflict(`${result.email} already exists`);

    const newUser = new User(result);
    const savedUser = await await newUser.save();

    res.send(savedUser);
    
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

// login route
router.post('/login', (req, res, next) => {
  res.send('login route');
});

// refresh-token route
router.post('/refresh', (req, res, next) => {
  res.send('refresh token route');
});

// logout route
router.delete('/logout', (req, res, next) => {
  res.send('logout route');
});



// exports
module.exports = router;