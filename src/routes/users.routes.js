const { Router } = require('express')

const {
  createUser, getUser, getUsers,
} = require('../controllers/users.controller')

const usersRouter = Router()

usersRouter.post('/', createUser)
usersRouter.get('/:username', getUser)
usersRouter.get('/', getUsers)

module.exports = usersRouter