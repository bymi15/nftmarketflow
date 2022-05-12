const express = require('express');

const apiKeysRoutes = express.Router();

apiKeysRoutes.get('/ipfs', (_, res) => {
  res.json({ key: process.env.IPFS_API_KEY });
});

module.exports = apiKeysRoutes;
