import React from 'react'
import ProjectCard from './ProjectCard';

const MainBody = ({ projects }) => {
  return (
    <>
      {
        projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))
      }
    </>
  )
}

export default MainBody