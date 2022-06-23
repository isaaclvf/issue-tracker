import SignUp from './components/SignUp'
import Login from './components/Login'
import { useState } from 'react'

export default function App() {
  const [token, setToken] = useState(null)

  return (
    <div>
      <Login handleToken={(resultToken) => { setToken(resultToken) }} />
    </div>
  )
}

