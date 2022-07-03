import helpers from "./helpers"

const baseUrl = 'http://localhost:3001'

const createUser = async (userObj) => {
  const response = await fetch(`${baseUrl}/api/users/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  })

  const parsedJSON = await response.json()
  return parsedJSON
}

const login = async (userObj) => {

  const response = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  })

  const parsedResponse = await response.json()

  return parsedResponse
}

const isAuth = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${baseUrl}/api/login/auth`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const isAuth = !(response.status === 401)
  return isAuth
}

const logout = () => {
  localStorage.clear()
}

const getProjects = async () => {
  const response = await fetch(`${baseUrl}/api/issues`)
  const parsedResponse = await response.json()

  return parsedResponse
}

const getTickets = async (project) => {
  const projectRoute = helpers.formatRoute(project.title)
  const response = await fetch(`${baseUrl}/api/issues/${projectRoute}`)
  const parsedResponse = await response.json()

  return parsedResponse.tickets
}

const getTicketInfo = async (projectTitle, ticketId) => {
  const projectRoute = helpers.formatRoute(projectTitle)

  const response = await fetch(`${baseUrl}/api/issues/${projectRoute}/${ticketId}`)
  const parsedResponse = await response.json()

  return parsedResponse
}

const getUsers = async () => {
  const response = await fetch(`${baseUrl}/api/users`)
  const parsedResponse = await response.json()

  return parsedResponse
}

const saveTicket = async (method, bodyObj, projectTitle, id) => {
  const projectRoute = helpers.formatRoute(projectTitle)

  const token = localStorage.getItem('token')

  const response = await fetch(`${baseUrl}/api/issues/${projectRoute}/${id}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bodyObj)
  })

  const parsedResponse = await response.json()

  return parsedResponse
}

const apiService = {
  createUser,
  login,
  logout,
  getProjects,
  getTickets,
  getTicketInfo,
  getUsers,
  saveTicket,
  isAuth,
}

export default apiService