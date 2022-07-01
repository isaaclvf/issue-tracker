const pool = require('../db')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  const { username, name, password, role = 'developer', isAdmin = false } = req.body

  const existingUserQuery = await pool
    .query(`
      SELECT * FROM users
      WHERE username = $1
    `, [username])

  if (existingUserQuery.rowCount) {
    return res.status(400).json({
      error: "username must be unique"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const result = await pool
    .query(`
      INSERT INTO users
      (username, password_hash, name, role, is_admin)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username, name, role
    `, [username, passwordHash, name, role, isAdmin])

  res.status(201).json(result.rows[0])
}

const getUser = async (req, res) => {
  const username = req.params.username
  const userQuery = await pool
    .query(`
      SELECT * FROM users
      WHERE username = $1
    `, [username])

  const userObj = userQuery.rows[0]
  res.json(userObj)
}

const getUsers = async (req, res) => {
  const users = await pool
    .query(`
      SELECT name, username FROM users
    `)

  res.json(users.rows)
}

module.exports = {
  createUser,
  getUser,
  getUsers,
}