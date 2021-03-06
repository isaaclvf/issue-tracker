const pool = require('../db')
const { formatRoute } = require('../utils/helpers')

const getAllProjects = async (req, res) => {
  const projects = await pool
    .query(`SELECT * FROM projects`)

  res.json(projects.rows)
}

const getProject = async (req, res) => {
  const projectRoute = req.params.project

  try {
    const projectQuery = await pool
      .query(`
        SELECT * FROM projects
        WHERE route = $1
      `, [projectRoute])

    if (projectQuery.rows.length === 0) {
      return res.status(404).end()
    }

    projectObj = projectQuery.rows[0]

    const ticketQuery = await pool
      .query(`
        SELECT * FROM tickets
        WHERE project_id = 
        (SELECT id FROM projects WHERE route = $1)
      `, [projectRoute])


    projectObj.tickets = ticketQuery.rows

    res.json(projectObj)
  } catch (error) {
    res.json(error)
  }
}

const createProject = async (req, res) => {
  const { title, description } = req.body
  const projectRoute = formatRoute(title)

  const result = await pool
    .query(`
      INSERT INTO projects 
      (title, description, route)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [title, description, projectRoute])

  res.json(result.rows[0])
}

const updateProject = async (req, res) => {
  const projectRoute = req.params.project
  const { title, description } = req.body

  const result = await pool
    .query(`
      UPDATE projects
      SET title = $1, description = $2
      WHERE route = $3
      RETURNING *
    `, [title, description, projectRoute])

  res.json(result.rows[0])
}

const deleteProject = async (req, res) => {
  const projectRoute = req.params.project

  await pool
    .query(`
      DELETE FROM projects
      WHERE route = $1
    `, projectRoute)

  res.status(204).end()
}

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}