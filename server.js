const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('morgan')('dev');
const connectDB = require('./config/db');
const cors = require('cors');

const Users = require('./routes/api/users.routes');

app.use(cors());

dotenv.config();

const router = express.Router();

connectDB();

app.use(logger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization',
  );
  next();
});

app.use('/api/users', router);
Users(router);

app.listen(process.env.PORT || 5000, () =>
  console.log('Server is running on port 5000'),
);
