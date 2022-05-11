const express = require('express');
const db = require('../db/db');

const saleItemRoutes = express.Router();

const COLLECTION = 'saleItems';

saleItemRoutes.get('/', (_, res) => {
  const saleItems = db.getCollection(COLLECTION);
  saleItems
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

saleItemRoutes.put('/', async (req, res) => {
  const saleItems = db.getCollection(COLLECTION);
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
    const result = await saleItems.findOneAndUpdate(query, update, options);
    res.status(200).json(result?.value);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error inserting sale item!');
  }
});

saleItemRoutes.delete('/:id', async (req, res) => {
  const saleItems = db.getCollection(COLLECTION);
  saleItems.deleteOne({ id: req.params.id }, function (err, _) {
    if (err) {
      res.status(400).send(`Error removing sale item with id ${req.params.id}!`);
    } else {
      console.log('Removed sale item');
      res.status(200).send();
    }
  });
});

module.exports = saleItemRoutes;
