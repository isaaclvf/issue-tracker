const { Router } = require('express')

const {
  loginUser
} = require('../controllers/login.controller')

const loginRouter = Router()

loginRouter.post('/', loginUser)

module.exports = loginRouter