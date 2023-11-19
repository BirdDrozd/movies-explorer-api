const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const {
  PORT = 3000,
  SERVER_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV } = process.env;

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors);

mongoose.connect(NODE_ENV === 'production' ? SERVER_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb', { autoIndex: true })
  .then(() => {
    console.log('Connected to database!');
  });
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'path-to-your-index-html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
