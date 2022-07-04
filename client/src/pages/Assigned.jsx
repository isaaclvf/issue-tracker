import { useState, useEffect} from 'react'
import BasicTable from '../components/BasicTable'
import TicketCard from '../components/TicketCard'
import apiService from '../services/apiService'

const Assigned = () => {
  const [tickets, setTickets] = useState([])

  const loadTickets = async () => {
    const username = localStorage.getItem('username')
    const result = await apiService.getAssignments(username)
    setTickets(result)
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const [openTicket, setOpenTicket] = useState({open: false, id: null})

  const handleOpenTicket = (id = null) => {
    setOpenTicket({
      open: true,
      id: id,
    })
  }

  return (
    <>
      <BasicTable rows={tickets} handleClick={handleOpenTicket} />
      {
        openTicket.open
        ? <TicketCard 
            ticketId={openTicket.id} 
            projectTitle={tickets.find(ticket => ticket.id === openTicket.id).route}
          />
        : null
      }
    </>
  )
}

export default Assigned