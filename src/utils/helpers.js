const formatRoute = (str) => {
  const re = /[^a-zA-Z\d\s]/g

  return str
    .toLowerCase()
    .replace(re, '')
    .replace(' ', '_')
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7) // After 'bearer '
  }

  return null
}

module.exports = {
  formatRoute,
  getTokenFrom,
}