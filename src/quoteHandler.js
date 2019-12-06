const randInt = require('./randInt')

const countQuotes = db => db.collection('quotes').countDocuments({})

module.exports = db => (req, res) => 
    countQuotes(db)
        .then(count => db.collection('quotes').findOne({}, { skip: randInt(0, count - 1) }))
        .then(result => Promise.all([
            result,
            db.collection('ponies').findOne({ shortId: result.pony }, { projection: { _id: 0, shortId: 0 }})
        ]))
        .then(([ quote, pony ]) => res.json({ quote: quote.quote, ...pony }))