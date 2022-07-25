const mongoose = require('mongoose');

// connect
mongoose.connect(
  process.env.MONGODB_URL,
  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
).then(() => {
  console.log('mongdb connected');
})
.catch(err => {
  console.log(err.message);
})

// connected
mongoose.connection.on('connected', () => {
  console.log('mongoose connected to mongodb');
});

// error
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

// disconnected
mongoose.connection.on('disconnected', () => {
  console.log('mongoose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
})
