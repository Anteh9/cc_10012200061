import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import AddContact from './Pages/AddContact';
import ContactList from './Pages/ContactList';
import EditContact from './Pages/EditContact';
import AuthPage from './Pages/AuthPage';
import Layout from './Pages/Layout';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    setIsAuthenticated(loggedIn === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setIsAuthenticated(true);
    toast.success('Logged in successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
    toast.info('You have been logged out.');
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/AuthPage" />;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Unauthenticated Route */}
        {!isAuthenticated && (
          <>
            <Route path="/AuthPage" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/AuthPage" />} />
          </>
        )}

        {/* Authenticated Routes */}
        {isAuthenticated && (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
