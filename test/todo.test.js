const app = require('../app')
const request = require('supertest')

describe('Todo Test', () => {
    test('Get Todo List', (done) => {
        request(app)
        .get('/api/todo')
        .expect('Content-Type', /json/)
        .expect(200)
        .then (response => {
            if (response.body) {
                expect(response.body.length).toEqual(4)
            }
            done()
        }).catch(done)
    })

    test('Get Todo Detail', (done) => {
        request(app)
        .get('/api/todo/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then (response => {
            if (response.body) {
                expect(response.body[0].id).toEqual(1)
            }
            done()
        }).catch(done)
    })

    test('Add Todo', (done) => {
        const newTodo = {
            id: "5",
            task: "Buy a new shirt",
            date: "2023-10-30",
            status: "Not Started"
        }
        request(app)
        .post('/api/todo')
        .send(newTodo)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.message).toBe("New Todo created.")
            done()
        })
        .catch(done)
    })

    test('Delete Todo', (done) => {
        const id = 5

        request(app)
        .delete(`/api/delete/todo/${id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.message).toBe(`Todo Deleted`)
            done()
        })
    })
})