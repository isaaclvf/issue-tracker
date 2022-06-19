const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

module.exports = {
  loginUser,
}