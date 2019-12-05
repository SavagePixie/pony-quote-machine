require('dotenv').config()
const mongo = require("mongodb")

module.exports = () =>
  mongo.MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(client => Promise.all([
      client,
      client.db(process.env.MONGO_DB)
    ]))