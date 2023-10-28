const express = require('express')
const port = 3010
const app = express()
const router = require('./routes/todo')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

// app.listen(port, () => {
//     console.log(`App Listening on http://localhost:${port}`)
// })

module.exports = app