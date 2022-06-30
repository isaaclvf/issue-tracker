import React from 'react'
import Typography from '@mui/material/Typography';

const ProjectPage = ({ project, handleClick }) => {
  return(
    <>
      <Typography variant="h5" component="div">
        {project.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {project.description}
      </Typography>
      <button onClick={handleClick} >Go back</button>
    </>
  )
}

export default ProjectPage