import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/Layout.css';

const Layout = ({ onLogout }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="sidebar-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="sidebar-link">Contact List</NavLink>
            </li>
            <li>
              <NavLink to="/add" className="sidebar-link">Add Contact</NavLink>
            </li>
            <li style={{ marginTop: '2rem' }}>
              <button
                onClick={onLogout}
                style={{
                  background: 'none',
                  color: 'red',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
