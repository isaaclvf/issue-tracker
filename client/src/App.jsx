import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Link to="/signup">Sign Up</Link> |{" "}
      <Link to="/login" >Login</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link>
      <Outlet />
    </div>
  )
}

