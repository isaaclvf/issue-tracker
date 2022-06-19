const { Router } = require('express')

const {
  createUser, getUser,
} = require('../controllers/users.controller')

const usersRouter = Router()

usersRouter.post('/', createUser)
usersRouter.get('/:username', getUser)

module.exports = usersRouter