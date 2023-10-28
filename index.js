var express = require('express')
var app = express()
var pool = require('./queries')
var todo = require('./routes/todo')

app.use('', todo)
app.use(express.json())

pool.connect((err, res) => {
    console.log(err)
    console.log('connected')
})

app.listen(3000)