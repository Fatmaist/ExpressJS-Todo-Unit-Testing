var express = require('express')
var router = express.Router()
var pool = require('../queries')
var bodyParser = require('body-parser')

router.use(bodyParser.json())

// API to get all the todo list
router.get('/todo', function(req, res){
    pool.query('Select * From TODO WHERE isDeleted = false', (err, result)=>{
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})

// API to get Detail Todo with ID
router.get('/todo/:id', function(req, res){
    pool.query('Select * From TODO Where id = $1 AND isDeleted = false', [req.params.id], (err, result)=>{
        if (err) {
            throw err
        }
        res.send(result.rows)
    })
})

// API POST to create new TODO
router.post('/todo', function (req, res) {
    const { id, task, date, status } = req.body
    if (!id || !task || !date || !status) {
        res.status(400)
        res.json({message: "Bad request"})
    } else {
        pool.query((`INSERT INTO TODO (id, task, date, status) VALUES (${id}, '${task}', '${date}', '${status}')`), (err, result) => {
            if (err) {
                res.json({message: "Failed to insert!"})
                return
            }
            res.json({message: "New Todo created."})
        })
    }
})

// API DELETE to SOFT DELETE TODO
router.delete('/todo/:id', function (req, res) {
    var todoId = req.params.id

    pool.query('UPDATE TODO SET isDeleted = true WHERE id = $1', [todoId], (err, result) => {
        if (err) {
            res.send('Failed to delete!')
            return
        }
        if (result.rowCount === 0) {
            res.json({ message: 'Not Found.' })
        } else {
            res.json({ message: "Todo " + todoId + " soft-deleted." })
        }
    })
})

// API DELETE PERMANENTLY TODO
router.delete('/delete/todo/:id', function (req, res) {
    var todoId = req.params.id

    pool.query('DELETE FROM TODO WHERE id = $1', [todoId], (err, result) => {
        if (err) {
            res.send('Failed to delete!')
            return
        }
        if (result.rowCount === 0) {
            res.json({ message: 'Not Found.' })
        } else {
            res.json({ message: "Todo Deleted" })
        }
    })
})

module.exports = router