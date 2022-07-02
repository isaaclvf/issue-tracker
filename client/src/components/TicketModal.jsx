import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup } from '@mui/material';
import apiService from '../services/apiService'
import Autocomplete from '@mui/material/Autocomplete'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TicketModal({ children, projectTitle }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [status, setStatus] = React.useState('')

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const [type, setType] = React.useState('')

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  const [users, setUsers] = React.useState([])

  const handleUsers = async () => {
    const result = await apiService.getUsers()
    setUsers(result)
  }

  React.useEffect(() => { 
    handleUsers()
  }, [])

  return (
    <FormGroup>
      <Button onClick={handleOpen} variant='contained'>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="ticket-modal"
        aria-describedby="ticket-modal-description"
      >
        <Box sx={style}>
        <Typography id="ticket-modal" variant="h6" component="h2">
          {children === 'Update' ? 'Update ticket' : 'Open new ticket'}
        </Typography>
          <TextField 
            id="ticket-title" 
            label="Title" 
            variant="outlined" 
            sx={{ mt: '1rem', mb: '1rem', width: '100%' }}
          />
          <TextField 
            id="description-title" 
            label="Description" 
            variant="outlined" 
            multiline
            rows={4}
            sx={{ mb: '1rem', width: '100%' }}
          />
          <FormControl fullWidth>
            <InputLabel id="status-text-label">Status</InputLabel>
            <Select
              labelId="status-text-label"
              id="status-text"
              value={status}
              label="Status"
              onChange={handleStatusChange}
              defaultValue={'New'}
              sx={{ mb: '1rem' }}
            >
              <MenuItem value={'New'}>New</MenuItem>
              <MenuItem value={'In Progress'}>In Progress</MenuItem>
              <MenuItem value={'Resolved'}>Resolved</MenuItem>
              <MenuItem value={'Feedback'}>Feedback</MenuItem>
              <MenuItem value={'Closed'}>Closed</MenuItem>
              <MenuItem value={'Rejected'}>Rejected</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="issue-type-label">Type</InputLabel>
            <Select
              labelId="issue-type-label"
              id="type"
              value={type}
              label="Type"
              onChange={handleTypeChange}
            >
              <MenuItem value={'Issue'}>Issue</MenuItem>
              <MenuItem value={'Feature Request'}>Feature Request</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <FormControlLabel control={<Checkbox />} label="Closed" sx={{ mb: '1rem' }} />
          </FormControl>
          <Autocomplete
            multiple
            disablePortal
            id="assigned-users"
            options={users.map(u => u.name)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Assigned Users" />}
          />
        </Box>
      </Modal>
    </FormGroup>
  );
}
