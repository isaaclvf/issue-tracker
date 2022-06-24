import SignUp from './routes/SignUp'
import Login from './routes/Login'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  const [token, setToken] = useState(null)

  return (
    <div>
      <Link to="/signup">Sign Up</Link> |{" "}
      <Link to="/login">Login</Link>
      <Outlet />
    </div>
  )
}

