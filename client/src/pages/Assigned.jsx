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

  const [openTicket, setOpenTicket] = useState({open: false, id: null})

  const handleOpenTicket = (id = null) => {
    setOpenTicket({
      open: true,
      id: id,
    })
  }

  useEffect(() => {
    loadTickets()
  }, [])

  return (
    <>
      <BasicTable rows={tickets} handleClick={handleOpenTicket} />
      {
        openTicket.open
        ? <TicketCard 
            ticketId={openTicket.id} 
          />
        : null
      }
    </>
  )
}

export default Assigned