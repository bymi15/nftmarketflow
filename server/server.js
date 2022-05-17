require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const saleItems = require('./routes/saleItems');
const apiKeys = require('./routes/apiKeys');
const currency = require('./routes/currency');
const activities = require('./routes/activities');

const PORT = process.env.PORT || 5000;

db.connect(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_, res) => {
  res.send('pong');
});
app.use('/saleItems', saleItems);
app.use('/apiKeys', apiKeys);
app.use('/currency', currency);
app.use('/activities', activities);
