const formatRoute = (str) => {
  const re = /[^a-zA-Z\d\s]/g

  return str
    .toLowerCase()
    .replace(re, '')
    .replace(' ', '_')
}

module.exports = {
  formatRoute,
}