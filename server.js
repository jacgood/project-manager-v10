const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const Users = require('./routes/api/users');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

dotenv.config();

connectDB();

app.use('/api/users', Users);

app.listen(process.env.PORT || 5000, () =>
  console.log('Server is running on port 5000'),
);
