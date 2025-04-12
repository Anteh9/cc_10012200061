import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <>
      <div
        // className={`sidebar ${isVisible ? 'show' : ''}`}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-links">
          <Link url="/" className="sidebar-link">Home</Link>
          <Link url="/contacts" className="sidebar-link">Contact List</Link>
          <Link url="/add" className="sidebar-link">Add Contact</Link>
        </div>
      </div>

      {/* Inline CSS inside JSX */}
      <style>{`
        .sidebar {
          width: 40px;
          height: 100vh;
          background-color: #1f2937; 
          color: #1f2937;
          transition: width 0.3s ease;
          overflow: hidden;
        }

        .sidebar.show {
          width: 50px;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .sidebar-link {
          color: black;
          text-decoration: none;
          margin-bottom: 1rem;
        }

        .sidebar-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', color: '#1f2937' }}>
      <Sidebar />
      <main style={{ padding: '1rem', flexGrow: 1 }}>{children}</main>
    </div>
  );
};

export default Layout;
