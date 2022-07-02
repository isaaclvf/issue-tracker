const formatRoute = (str) => {
  const re = /[^a-zA-Z\d\s]/g

  return str
    .toLowerCase()
    .replace(re, '')
    .replaceAll(' ', '_')
}

const helpers = {
  formatRoute
}

export default helpers