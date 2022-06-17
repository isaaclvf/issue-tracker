const { Router } = require('express')

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller')

const {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/tickets.controller')

const projectRouter = Router()

projectRouter.get('/', getAllProjects)
projectRouter.get('/:project/', getProject)
projectRouter.post('/', createProject)
projectRouter.put('/:project', updateProject)
projectRouter.delete('/:project', deleteProject)

projectRouter.get('/:project/:id', getTicket)
projectRouter.post('/:project/', createTicket)
projectRouter.put('/:project/:id', updateTicket)
projectRouter.delete('/:project/:id', deleteTicket)

module.exports = projectRouter