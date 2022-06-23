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

export default { createUser }