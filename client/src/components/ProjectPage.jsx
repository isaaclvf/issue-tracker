import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import apiService from '../services/apiService';
import BasicTable from './BasicTable';
import TicketCard from './TicketCard';
import { Box } from '@mui/material';
import TicketModal from './TicketModal';

const ProjectPage = ({ project, handleClick }) => {
  const [tickets, setTickets] = React.useState([]) 
  
  const loadProject = async () => {
    const result = await apiService.getTickets(project)
    setTickets(result)
  }

  const [openTicket, setOpenTicket] = React.useState({open: false, id: null})

  const handleOpenTicket = (id = null) => {
    setOpenTicket({
      open: true,
      id: id,
    })
  }

  React.useEffect(() => {
    loadProject()
  }, [])

  const reloadProject = () => {
    loadProject()
  }

  return(
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Button variant='outlined' size='small' 
            onClick={handleClick} 
          >
            Go back
          </Button>
          <Typography variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {project.description}
          </Typography>
        </Box>
        <TicketModal 
          projectTitle={project.title}
          reload={reloadProject}
        >
          New
        </TicketModal>
      </Box>

      <BasicTable rows={tickets} handleClick={handleOpenTicket} />
      {
        openTicket.open
        ? <TicketCard 
            projectTitle={project.title} 
            ticketId={openTicket.id} 
            reloadProject={reloadProject}
          />
        : null
      }
    </>
  )
}

export default ProjectPage