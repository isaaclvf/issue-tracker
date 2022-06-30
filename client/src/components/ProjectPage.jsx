import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import apiService from '../services/apiService';

const ProjectPage = ({ project, handleClick }) => {
  const [tickets, setTickets] = React.useState([]) 
  
  const handleProject = async () => {
    const result = await apiService.getTickets(project)
    console.log(result)
    setTickets(result)
  }

  React.useEffect(() => {
    handleProject()
  }, [])

  return(
    <>
      <Typography variant="h5" component="div">
        {project.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {project.description}
      </Typography>
      <Button variant='outlined' size='small' 
        onClick={handleClick} 
      >
        Go back
      </Button>
    </>
  )
}

export default ProjectPage