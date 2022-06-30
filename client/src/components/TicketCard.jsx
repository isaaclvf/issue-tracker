import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TicketCard({ ticket }) {
  console.log(ticket)

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
