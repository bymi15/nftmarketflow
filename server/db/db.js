const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let con;
module.exports = {
  connect: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      con = db.db('nftmarketflowdb');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getConnection: function () {
    return con;
  },

  getCollection: function (collectionName) {
    return con.collection(collectionName);
  },
};
