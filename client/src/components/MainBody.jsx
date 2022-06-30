import React from 'react'
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectPage from './ProjectPage';

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

const MainBody = ({ projects }) => {
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

export default MainBody