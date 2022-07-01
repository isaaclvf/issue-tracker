import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import apiService from '../services/apiService';
import BasicTable from './BasicTable';
import TicketCard from './TicketCard';
import { Box } from '@mui/material';
import BasicModal from './BasicModal';

const activeTicket = ({ tickets, handleClick}) => {
  return (
    <>
      {
        tickets.find()
      }
    </>
  )
}

const ProjectPage = ({ project, handleClick }) => {
  const [tickets, setTickets] = React.useState([]) 
  
  const handleProject = async () => {
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
    handleProject()
  }, [])

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
        <BasicModal>Create new ticket</BasicModal>
      </Box>

      <BasicTable rows={tickets} handleClick={handleOpenTicket} />
      {
        openTicket.open
        ? <TicketCard 
            projectTitle={project.title} 
            ticketId={openTicket.id} 
          />
        : null
      }
    </>
  )
}

export default ProjectPage