import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assigned from './pages/Assigned';
import Projects from './pages/Projects';
import Submitted from './pages/Submitted';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/projects' element={<Projects />} />
          <Route path='/dashboard/assigned' element={<Assigned />} />
          <Route path='/dashboard/submitted' element={<Submitted />} />
        </Route>
      </ Route>
    </Routes>
  </BrowserRouter>
);

