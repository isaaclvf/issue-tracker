const pool = require('../db')

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
  const { title, description, type, status_text, open } = req.body

  const projectIdQuery = await pool
    .query(
      `SELECT id FROM projects WHERE route = $1`,
      [projectRoute]
    )
  const projectId = projectIdQuery.rows[0].id

  if (!projectId) {
    return res.status(404).send({ error: 'project not found' })
  }

  const result = await pool
    .query(`
      INSERT INTO tickets
      (project_id, title, description, type, status_text, open)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [projectId, title, description, type, status_text, open])

  res.json(result.rows[0])
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