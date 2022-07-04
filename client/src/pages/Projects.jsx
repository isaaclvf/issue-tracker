import React from 'react'
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import ProjectCard from '../components/ProjectCard';
import ProjectPage from '../components/ProjectPage';

const ProjectList = ({ projects, handleClick }) => {
  return (
    <>
      {
        projects.map(project => (
          <ProjectCard key={project.id} project={project} 
            handleClick={handleClick}
          />
        ))
      }
    </>
  )
}

const Projects = () => {
  const [projects, setProjects] = useState([]) 
  
  const handleProjects = async () => {
    const result = await apiService.getProjects()
    setProjects(result)
  }

  useEffect(() => {
    handleProjects()
  }, [])

  const [openProject, setOpenProject] = useState({open: false, id: null})

  const handleOpenProject = (id = null) => {
    setOpenProject({
      open: !openProject.open,
      id: id,
    })
  }

  return (
    <>
      {
        openProject.open
        ? <ProjectPage 
            project={projects.find(proj => proj.id === openProject.id)} 
            handleClick={handleOpenProject}
          />
        : <ProjectList projects={projects} handleClick={handleOpenProject} />
      }
    </>
  )
}

export default Projects