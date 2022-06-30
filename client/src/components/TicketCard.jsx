import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import apiService from '../services/apiService';
import BasicModal from './BasicModal';

export default function TicketCard({ projectTitle, ticketId }) {
  const [ticket, setTicket] = React.useState([])

  const handleTicketInfo = async (projectTitle, ticketId) => {
    const result = await apiService.getTicketInfo(projectTitle, ticketId)
    setTicket(result)
  }

  React.useEffect(() => { 
    handleTicketInfo(projectTitle, ticketId)
   }, [ticketId])

  const formatDate = (date) => {
    const dateObj = new Date(date)
    const dateStr = dateObj.toString()
    return dateStr.slice(4, 21) // Only shows something like 'Jun 19 2022 16:03'
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
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {ticket.open ? `Open ${ticket.type}` : `Closed ${ticket.type}`}
        </Typography>
        <Typography>
          {ticket.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Submitted by {ticket.submittedBy ? ticket.submittedBy.name : 'unknown'}
          {', '} {formatDate(ticket.created_at)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="">
          Assigned to {
            ticket.assignedUsers 
            ? ticket.assignedUsers.map(user => `${user.name} `) 
            : 'nobody'}
        </Typography>
        <Typography>
          {`Status: ${ticket.status_text}`}
        </Typography>
        <Typography>
          {`Last updated: ${formatDate(ticket.updated_at)}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <Button size="medium"
          variant='contained'
          sx={{
            marginTop: '1rem'
          }}
        >
          Update
        </Button> */}
        <BasicModal>
          Update
        </BasicModal>
      </CardActions>
    </Card>
  );
}
