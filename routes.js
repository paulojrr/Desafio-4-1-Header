const express = require('express')
const routes = express.Router()


routes.get('/', (req, res) => {
    res.render('teachers/index')
})

routes.get('/students', (req, res) => {
    res.send('students')
})

module.exports = routes