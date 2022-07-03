import { useState, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

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

export default function TicketModal({ children, projectTitle, ticketId, reload }) {
  // This refers to if the modal is open or not
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // For the loading button
  const [loading, setLoading] = useState(false)

  // Change some options based on if you are editing or creating tickets
  const [editing, setEditing] = useState(false)

  // Get users to fill the autocomplete form
  const [availableUsers, setAvailableUsers] = useState([])

  const handleAvailableUsers = async () => {
    const result = await apiService.getUsers()
    setAvailableUsers(result)
  }

  useEffect(() => { 
    handleAvailableUsers()
  }, [])

  // Information needed to create or edit the ticket
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('New')
  const [type, setType] = useState('Bug')
  const [closedTicket, setClosedTicket] = useState(false)
  const [assignedUsers, setAssignedUsers] = useState([])
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  const handleClosedChange = (event) => {
    setClosedTicket(event.target.checked)
  }

  const handleAssignedChange = (event, value) => {
    setAssignedUsers(value)
  }

  // Load ticket information so it can be edited
  const loadTicket = async (projectTitle, ticketId) => {
    if (!ticketId) return

    const ticket = await apiService.getTicketInfo(projectTitle, ticketId)
    setEditing(true)

    setTitle(ticket.title)
    setDescription(ticket.description)
    setStatus(ticket.status_text)
    setType(ticket.type)
    setClosedTicket(!ticket.open)
    setAssignedUsers(ticket.assignedUsers)
  }

  useEffect(() => { 
    loadTicket(projectTitle, ticketId)
  }, [ticketId])


  // Send request
  const handleSubmit = async () => {
    setLoading(true)

    const method = editing ? 'PUT' : 'POST'

    const formObj = {
      title,
      description,
      type,
      statusText: status,
      open: !closedTicket,
      assignedUsers,
    }

    const id = editing ? ticketId : ''

    await apiService.saveTicket(method, formObj, projectTitle, id)
    
    if (editing) {
      reload()
      setLoading(false)
      setOpen(false)
    }

    reload()
    setLoading(false)
    setOpen(false)
  }

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
            defaultValue={title}
            onChange={handleTitleChange}
          />
          <TextField 
            id="description-title" 
            label="Description" 
            variant="outlined" 
            multiline
            rows={4}
            sx={{ mb: '1rem', width: '100%' }}
            defaultValue={description}
            onChange={handleDescriptionChange}
          />
          {
            editing
            ? <FormControl fullWidth>
              <InputLabel id="status-text-label">Status</InputLabel>
              <Select
                labelId="status-text-label"
                id="status-text"
                value={status}
                label="Status"
                onChange={handleStatusChange}
                defaultValue={status}
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
            : null
          }
          <FormControl fullWidth>
            <InputLabel id="issue-type-label">Type</InputLabel>
            <Select
              labelId="issue-type-label"
              id="type"
              value={type}
              label="Type"
              onChange={handleTypeChange}
              defaultValue={type}
              sx={{ mb: '1rem' }}
            >
              <MenuItem value={'Bug'}>Bug</MenuItem>
              <MenuItem value={'Feature Request'}>Feature Request</MenuItem>
            </Select>
          </FormControl>
          {
            editing
            ? <FormControl fullWidth>
              <FormControlLabel 
                control={
                  <Checkbox 
                    onChange={handleClosedChange}
                    checked={closedTicket}
                  />
                } 
                label="Closed" 
                sx={{ mb: '1rem' }} />
            </FormControl>
            : null
          }
          <Autocomplete
            multiple
            disablePortal
            id="assigned-users"
            options={availableUsers.map(u => u.username)}
            sx={{ width: '100%', mb: '1rem' }}
            renderInput={(params) => <TextField {...params} label="Assigned Users" />}
            onChange={handleAssignedChange}
          />

              <Button 
                variant='contained' 
                type='submit'
                onClick={handleSubmit}
                disabled={!title || !description}
              >
                {
                  loading 
                    ? <CircularProgress
                      color='inherit'
                      size={24}
                    /> 
                    : 'Save'
                }
              </Button>
        </Box>
      </Modal>
    </FormGroup>
  );
}
