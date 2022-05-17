const express = require('express');
const db = require('../db/db');

const activityRoutes = express.Router();

const COLLECTION = 'activities';

activityRoutes.get('/', (req, res) => {
  const activities = db.getCollection(COLLECTION);
  activities
    .find({})
    .limit(100)
    .toArray(function (err, result) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(result);
      }
    });
});

activityRoutes.post('/', async (req, res) => {
  const activities = db.getCollection(COLLECTION);
  const doc = {
    nftID: req.body.nftID,
    price: req.body.price,
    metadata: req.body.metadata,
    ipfsHash: req.body.ipfsHash,
    uuid: req.body.uuid,
    listedBy: req.body.listedBy,
    updatedAt: new Date(),
  };

  const query = { nftID: doc.nftID };
  const update = { $set: doc };
  const options = { upsert: true, returnNewDocument: true };
  try {
    const result = await activities.findOneAndUpdate(query, update, options);
    res.status(200).json(result?.value);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error inserting sale item!');
  }
});

module.exports = activityRoutes;
