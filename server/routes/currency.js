const express = require('express');
const db = require('../db/db');
const fetch = require('node-fetch');

const currencyRoutes = express.Router();

const COLLECTION = 'currency';

const CURRENCY_SYNC_INTERVAL_DAYS = 1;
const ALLOWED_CURRENCY = ['BTC', 'FLOW', 'ETH'];

currencyRoutes.get('/', async (req, res) => {
  const currencyCollection = db.getCollection(COLLECTION);
  let symbol = req.query.symbol?.toUpperCase();
  if (!symbol || !ALLOWED_CURRENCY.includes(symbol)) {
    symbol = 'FLOW';
  }
  let result = await currencyCollection.findOne({ symbol: symbol });
  const lastUpdatedDate = result && new Date(result.timestamp);
  const todayPlusOffset = new Date();
  todayPlusOffset.setDate(todayPlusOffset.getDate() + CURRENCY_SYNC_INTERVAL_DAYS);
  if (!lastUpdatedDate || lastUpdatedDate > todayPlusOffset) {
    //   fetch latest currency data from CoinCap API
    console.log('fetching latest currency data from CoinCap API...');
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets?search=${symbol}`, {
        headers: {
          Authorization: `Bearer ${process.env.COINCAP_API_KEY}`,
        },
      });
      const jsonResult = await response.json();
      if (jsonResult && jsonResult.data?.length > 0) {
        const currencyData = {
          symbol: symbol,
          name: jsonResult.data[0].name,
          supply: jsonResult.data[0].supply,
          marketCapUSD: jsonResult.data[0].marketCapUsd,
          priceUSD: jsonResult.data[0].priceUsd,
          explorer: jsonResult.data[0].explorer,
          rank: jsonResult.data[0].rank,
          timestamp: jsonResult.timestamp,
        };
        console.log(currencyData);
        const query = { symbol: symbol };
        const update = { $set: currencyData };
        const options = { upsert: true, returnNewDocument: true };
        await currencyCollection.findOneAndUpdate(query, update, options);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send('Error handling currency!');
    }
  }
  result = await currencyCollection.findOne({ symbol: symbol });
  res.status(200).json(result);
});

module.exports = currencyRoutes;
