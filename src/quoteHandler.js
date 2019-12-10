const randInt = require('./randInt')

const countPony = (name, db) => db.collection('ponies').findOne({ name: name }, { projection: { shortId: 1 }})
    .then(data => Promise.all([
        data.shortId,
        db.collection('quotes').countDocuments({ pony: data.shortId }),
    ]))

const getPonyQuote = db => (req, res) => countPony(req.params.name, db)
    .then(([ id, count ]) => db.collection('quotes').findOne({ pony: id }, { skip: randInt(0, count - 1) }))
    .then(result => Promise.all([
        result,
        db.collection('ponies').findOne({ shortId: result.pony }, { projection: { _id: 0, shortId: 0 }}),
    ]))
    .then(([ quote, pony ]) => res.json({ quote: quote.quote, ...pony }))
    .catch(error => res.status(404).send(`${req.params.name} not found.`))

const countQuotes = db => db.collection('quotes').countDocuments({})

const getQuote = db => (req, res) => countQuotes(db)
    .then(count => db.collection('quotes').findOne({}, { skip: randInt(0, count - 1) }))
    .then(result => Promise.all([
        result,
        db.collection('ponies').findOne({ shortId: result.pony }, { projection: { _id: 0, shortId: 0 }}),
    ]))
    .then(([ quote, pony ]) => res.json({ quote: quote.quote, ...pony }))

module.exports = { getQuote, getPonyQuote }