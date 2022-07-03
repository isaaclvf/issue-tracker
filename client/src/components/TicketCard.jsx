import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import apiService from '../services/apiService';
import Chip from '@mui/material/Chip';
import TicketModal from './TicketModal';
import BasicDialog from './BasicDialog';

export default function TicketCard({ projectTitle, ticketId }) {
  const [ticket, setTicket] = React.useState([])

  const loadTicket = async (projectTitle, ticketId) => {
    const result = await apiService.getTicketInfo(projectTitle, ticketId)
    setTicket(result)
  }

  React.useEffect(() => { 
    loadTicket(projectTitle, ticketId)
  }, [ticketId])

  const formatDate = (date) => {
    const dateObj = new Date(date)
    const dateStr = dateObj.toString()
    // Only shows something like 'Jan 01 2000 00:00'
    return dateStr.slice(4, 21) 
  }

  const reloadTicket = () => {
    loadTicket(projectTitle, ticketId)
  }

  return (
    <Card sx={{ 
      minWidth: 275, 
      marginBottom: '1rem', 
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {ticket.title}
        </Typography>
        
        <Chip 
          variant="outlined" 
          color="primary" 
          label={ticket.open ? 'Open' : 'Closed'}
          size='small'
          sx={{ marginRight: '0.5rem' }}
        /> 
        <Chip 
          variant="outlined" 
          color="primary" 
          label={ticket.status_text}
          size='small'
        /> 
        
        <Typography sx={{ mt: '1rem' }}>
          {ticket.description}
        </Typography>
        <Typography sx={{ mt: '1rem' }} color="text.secondary">
          Assigned to {
            ticket.assignedUsers 
            ? ticket.assignedUsers.map((user, i) => {
              return i === 0 ? `${user.name}` : `, ${user.name}`
            }) 
            : 'nobody'}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Submitted by {ticket.submittedBy ? ticket.submittedBy.name : 'unknown'}
        </Typography>
        <Typography color="text.secondary">
          {`Created at: ${formatDate(ticket.created_at)}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Last updated: ${formatDate(ticket.updated_at)}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: '1.5rem'
        }}
      >
        <TicketModal 
          projectTitle={projectTitle} 
          ticketId={ticketId}
          reload={reloadTicket}
        >
          Update
        </TicketModal>
        <BasicDialog 
          buttonMsg={'Delete'}
          action={() => console.log('delete')}
          sx={{ mb: '1rem' }}
        >
          Are you sure you want to delete this ticket?
          This action cannot be undone.
        </BasicDialog>
      </CardActions>
    </Card>
  );
}
