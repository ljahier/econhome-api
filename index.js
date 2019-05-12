const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fs = require('fs')
const mysql = require('mysql')
const crypto = require('crypto')
const cors = require('cors')

const port = process.env.PORT || 8081

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.set('view engine', 'ejs')

require('./routes/index')(app, ejs, fs, mysql, crypto)

let pass = crypto.createHmac('sha256', 'admin')

app.listen(port, () => console.log("Server running on localhost:%s", port))