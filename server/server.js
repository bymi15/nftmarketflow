require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const saleItems = require('./routes/saleItems');
const ipfsToken = require('./routes/ipfsToken');

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
app.use('/saleItems', saleItems);
app.use('/ipfsToken', ipfsToken);
