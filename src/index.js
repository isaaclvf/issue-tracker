const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const projectRouter = require('./routes/projects.routes')

const { errorHandler, unknownEndpoint } = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/issues/', projectRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}. http://localhost:${PORT}`)
})