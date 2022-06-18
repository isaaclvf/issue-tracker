const { Router } = require('express')

const {
  createUser,
} = require('../controllers/users.controller')

const usersRouter = Router()

usersRouter.post('/', createUser)

module.exports = usersRouter