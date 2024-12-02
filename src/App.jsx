// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Commerce from './components/webCommerce';
import UserSettings from './components/Settings';
import Admin from './components/Admin';
import Dashboard from './components/Commerce';

import { useEffect, useState } from 'react';

function App() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLogged(true);
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setUserLogged(true);
    localStorage.setItem("token", data);
    window.location.href = '/';
  };

  const handleLogout = () => {
    setUserLogged(false);
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <Router>
      <NavBar userLogged={userLogged} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Commerce />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<UserSettings handleLogout={handleLogout}/>} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;