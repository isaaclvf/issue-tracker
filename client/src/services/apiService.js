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

const logout = () => {
  localStorage.clear()
}

const getProjects = async () => {
  const response = await fetch(`${baseUrl}/api/issues`)

  const parsedResponse = await response.json()

  return parsedResponse
}

const apiService = {
  createUser,
  login,
  logout,
  getProjects
}

export default apiService