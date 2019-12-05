require('dotenv').config()
const mongo = require("mongodb")

const close = client => () => client.close().then(() => {
    console.log("See you next time!")
    process.exit()
})

const connect = () =>
  mongo.MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(client => Promise.all([
        client,
        client.db(process.env.MONGO_DB)
    ]))

module.exports = { close, connect }