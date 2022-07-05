const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('express-async-errors')
const path = require('path')

const projectRouter = require('./routes/projects.routes')
const usersRouter = require('./routes/users.routes')
const loginRouter = require('./routes/login.routes')

const { getAssignments, getSubmissions } = require('./controllers/tickets.controller')

const middleware = require('./utils/middleware')

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/issues/', projectRouter)
app.use('/api/users/', usersRouter)
app.use('/api/login/', loginRouter)

app.get('/api/submitted_by/:user', getSubmissions)
app.get('/api/assigned_to/:user', getAssignments)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app