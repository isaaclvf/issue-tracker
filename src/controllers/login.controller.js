const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getTokenFrom } = require('../utils/helpers')

const loginUser = async (req, res) => {
  const { username, password } = req.body

  const userQuery = await pool
    .query(`
      SELECT * FROM users
      WHERE username = $1
    `, [username])

  const userObj = userQuery.rows[0]

  const passwordCorrect = userObj === undefined
    ? false
    : await bcrypt.compare(password, userObj.password_hash)

  if (!(userObj && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password"
    })
  }

  // Payload
  const userForToken = {
    username: userObj.username,
    id: userObj.id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: (60 * 60) * 6 } // 6 hours
  )

  res
    .status(200)
    .send({ token, username: userObj.username, name: userObj.name })
}

const isAuth = async (req, res) => {
  // Check token
  const token = getTokenFrom(req)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  } catch (err) {
    return res.status(401).json(err.message)
  }

  return res.status(200)
}

module.exports = {
  loginUser,
  isAuth,
}