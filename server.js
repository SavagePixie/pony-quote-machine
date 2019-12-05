'use strict'

require('dotenv').config()

const express = require('express')

const db = require('./src/db')

const app = express()
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))