'use strict'

require('dotenv').config()

const express = require('express')

const db = require('./src/db')
const getQuote = require('./src/quoteHandler')

const addCors = (req, res, next) => {
    res.set({ 'Access-Control-Allow-Origin': '*' })
    next()
 }

const startApp = ([ client, db ]) => {
    const app = express()

    app.use('/', express.static('public'))
    app.use('/vanilla', express.static('vanilla', { extensions: [ 'html' ] }))
    app.use('/react', express.static('react'))
    
    app.get('/quote', addCors, findQuote(db))

    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
}

db.connect()
    .then(startApp)
