const express = require('express');
const db = require('../db/db');

const activityRoutes = express.Router();

const COLLECTION = 'activities';

activityRoutes.get('/', async (req, res) => {
  const activitiesCollection = db.getCollection(COLLECTION);
  let query = {};
  if (req.query.eventType) {
    query.eventType = req.query.eventType;
  }
  if (req.query.userAddr) {
    query.userAddr = req.query.userAddr;
  }
  const result = await activitiesCollection.find(query).sort({ date: -1 }).limit(100).toArray();
  res.status(200).json(result);
});

activityRoutes.post('/', async (req, res) => {
  const activitiesCollection = db.getCollection(COLLECTION);
  const doc = {
    eventType: req.body.eventType,
    nftID: req.body.nftID,
    nftName: req.body.nftName,
    owner: req.body.owner,
    price: req.body.price,
    ipfsHash: req.body.ipfsHash,
    userAddr: req.body.userAddr,
    date: new Date(),
  };

  try {
    const result = await activitiesCollection.insertOne(doc);
    res.status(200).json({ _id: result?.insertedId, ...doc });
  } catch (err) {
    console.log(err);
    res.status(400).send('Error inserting activity!');
  }
});

module.exports = activityRoutes;
