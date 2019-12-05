var express = require('express')
var app = express()

const constants = require('./constants');

app.use(function(req, res, next) {
    console.log('inside mw 1')
    req.htmlText = "Hello how is your day going?"
    next();
})

app.use(function(req, res, next) {
    console.log('inside mw 2')
    req.htmlText = "Not good?"
    next();
})

const helpController = require('./help');
app.use('/help', helpController)

app.use('/', function(req, res, next) {
    console.log('inside mw 3B')
    res.send(`${req.htmlText}`)
})

app.use(function(req, res, next) {
    console.log('inside mw 4')
})

console.log('listening on port', constants.port)

app.listen(constants.porxt)