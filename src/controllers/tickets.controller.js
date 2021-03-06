const pool = require('../db')
const { getTokenFrom } = require('../utils/helpers')
const jwt = require('jsonwebtoken')

const getTicket = async (req, res) => {
  const ticketId = req.params.id

  const ticketQuery = await pool
    .query(`
      SELECT * FROM tickets
      WHERE id = $1
    `, [ticketId])

  if (ticketQuery.rows.length === 0) {
    return res.status(404).end()
  }

  const ticket = ticketQuery.rows[0]

  const assignedUsersQuery = await pool.query(`
    SELECT name, username, role FROM users WHERE id IN (
      SELECT user_id FROM assigned_to WHERE ticket_id = $1
    )
  `, [ticketId])

  ticket.assignedUsers = assignedUsersQuery.rows

  const submittedByQuery = await pool.query(`
    SELECT name, username, role FROM users WHERE id = (
      SELECT user_id FROM submitted_by WHERE ticket_id = $1
    )
  `, [ticketId])

  ticket.submittedBy = submittedByQuery.rows[0]

  res.json(ticket)
}

const createTicket = async (req, res) => {
  const projectRoute = req.params.project
  const {
    title,
    description,
    type,
    statusText,
    open,
    assignedUsers
  } = req.body

  // Check token
  const token = getTokenFrom(req)
  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  } catch (err) {
    return res.status(401).json(err.message)
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
    `, [projectId, title, description, type, statusText, open])

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
  const { title, description, type, statusText, open } = req.body

  const result = await pool
    .query(`
      UPDATE tickets
      SET title = $1, description = $2, type = $3, status_text = $4, open = $5
      WHERE id = $6
      RETURNING *
    `, [title, description, type, statusText, open, ticketId])

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

const getSubmissions = async (req, res) => {
  const username = req.params.user

  const ticketsQuery = await pool
    .query(`
      SELECT tickets.*, projects.route FROM tickets, projects WHERE tickets.id in
      (
        SELECT ticket_id FROM submitted_by WHERE user_id = 
        (
          SELECT id FROM users WHERE username = $1
        )
      )
      AND tickets.project_id = projects.id
    `, [username])

  if (ticketsQuery.rowCount === 0) {
    return res.status(404).end()
  }

  res.json(ticketsQuery.rows)
}

const getAssignments = async (req, res) => {
  const username = req.params.user

  const ticketsQuery = await pool
    .query(`
      SELECT tickets.*, projects.route FROM tickets, projects WHERE tickets.id in
      (
        SELECT ticket_id FROM assigned_to WHERE user_id = 
        (
          SELECT id FROM users WHERE username = $1
        )
      )
      AND tickets.project_id = projects.id
    `, [username])

  if (ticketsQuery.rowCount === 0) {
    return res.status(404).end()
  }

  res.json(ticketsQuery.rows)
}

module.exports = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getSubmissions,
  getAssignments,
}