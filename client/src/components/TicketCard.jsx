import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import apiService from '../services/apiService';

export default function TicketCard({ projectTitle, ticketId }) {
  const [ticket, setTicket] = React.useState([])

  const handleTicketInfo = async (projectTitle, ticketId) => {
    const result = await apiService.getTicketInfo(projectTitle, ticketId)
    console.log(result)
    setTicket(result)
  }

  React.useEffect(() => { 
    handleTicketInfo(projectTitle, ticketId)
    console.log(ticketId)
   }, [ticketId])

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
          {ticket.open ? 'Open' : 'Closed'}
        </Typography>
        <Typography>
          {ticket.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium"
          variant='contained'
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
