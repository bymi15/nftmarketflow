const express = require('express');

const ipfsTokenRoutes = express.Router();

ipfsTokenRoutes.get('/', (_, res) => {
  res.json({ token: process.env.IPFS_API_KEY });
});

module.exports = ipfsTokenRoutes;
