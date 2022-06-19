const pool = require('../db')
const { getTokenFrom } = require('../utils/helpers')
const jwt = require('jsonwebtoken')

const getTicket = async (req, res) => {
  const ticketId = req.params.id

  const result = await pool
    .query(`
      SELECT * FROM tickets
      WHERE id = $1
    `, [ticketId])

  if (result.rows.length === 0) {
    return res.status(404).end()
  }

  res.json(result.rows[0])
}

const createTicket = async (req, res) => {
  const projectRoute = req.params.project
  const {
    title,
    description,
    type,
    status_text,
    open,
    assignedUsers
  } = req.body

  console.log(assignedUsers)

  // Check token
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  // Check project
  const projectIdQuery = await pool
    .query(
      `SELECT id FROM projects WHERE route = $1`,
      [projectRoute]
    )
  const projectId = projectIdQuery.rows[0].id

  if (!projectId) {
    return res.status(404).send({ error: 'project not found' })
  }

  // Add ticket
  const ticketQuery = await pool
    .query(`
      INSERT INTO tickets
      (project_id, title, description, type, status_text, open)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [projectId, title, description, type, status_text, open])

  const ticketObj = ticketQuery.rows[0]

  // Register submission
  await pool
    .query(`
      INSERT INTO submitted_by
      (ticket_id, user_id)
      VALUES ($1, $2)
    `, [ticketObj.id, decodedToken.id])

  // Register assignments
  for (const username of assignedUsers) {
    await pool
      .query(`
        INSERT INTO assigned_to
        (ticket_id, user_id)
        VALUES ($1, (
          SELECT id FROM users WHERE username = $2
        ))
      `, [ticketObj.id, username])
  }

  res.json(ticketObj)
}

const updateTicket = async (req, res) => {
  const ticketId = req.params.id
  const { title, description, type, status_text, open } = req.body

  const result = await pool
    .query(`
      UPDATE tickets
      SET title = $1, description = $2, type = $3, status_text = $4, open = $5
      WHERE id = $6
      RETURNING *
    `, [title, description, type, status_text, open, ticketId])

  res.json(result.rows[0])
}

const deleteTicket = async (req, res) => {
  const ticketId = req.params.id

  await pool
    .query(`
      DELETE FROM tickets
      WHERE id = $1
    `, [ticketId])

  res.status(204).end()
}

module.exports = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}