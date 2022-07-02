const { Router } = require('express')

const {
  loginUser, isAuth
} = require('../controllers/login.controller')

const loginRouter = Router()

loginRouter.post('/', loginUser)
loginRouter.post('/auth', isAuth)

module.exports = loginRouter