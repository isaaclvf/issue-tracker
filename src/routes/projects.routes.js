const { Router } = require('express')

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller')

const projectRouter = Router()

projectRouter.get('/', getAllProjects)
projectRouter.get('/:project/', getProject)
projectRouter.post('/', createProject)
projectRouter.put('/:project', updateProject)
projectRouter.delete('/:project', deleteProject)

module.exports = projectRouter