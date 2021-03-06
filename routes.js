const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.index)

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create')
})

routes.post('/teachers', teachers.post)

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)

routes.get('/students', (req, res) => {
    return res.send('students')
})

module.exports = routes