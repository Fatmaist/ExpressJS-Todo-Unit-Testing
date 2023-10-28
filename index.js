var express = require('express')
var app = express()
var pool = require('./queries')
var todo = require('./todo')

app.use('', todo)

pool.connect((err, res) => {
    console.log(err)
    console.log('connected')
})

app.listen(3000)