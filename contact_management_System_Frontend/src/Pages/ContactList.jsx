import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/ContactList.css"; // Import the CSS file

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null); // For success message
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [isDeleting, setIsDeleting] = useState(false); // To track the delete operation

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error('Error fetching contacts:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    setIsDeleting(true);
    try {
      setLoading(true); // Set loading to true when starting delete request
      await fetch(`http://localhost:5000/contacts/${id}`, {
        method: 'DELETE',
      });

      setContacts((prev) => prev.filter((contact) => contact.contact_id !== id));
      setMessage('Contact deleted successfully!');
      setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
    } catch (err) {
      setError('Error deleting contact. Please try again.');
      console.error('Error deleting contact:', err);
    } finally {
      setIsDeleting(false);
      setLoading(false); // Set loading to false once the delete operation finishes
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    [contact.companyName, contact.companyEmail, contact.companyAddress]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="contact-list-container">
      <h2 className="title">All Contacts</h2>

      {/* 🔔 Notification */}
      {message && (
        <div className="notification success">
          {message}
        </div>
      )}

      {/* ⚠️ Error Notification */}
      {error && (
        <div className="notification error">
          {error}
        </div>
      )}

      {/* 🔍 Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 📇 Contact Cards */}
      <div className="contact-cards">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.contact_id} className="contact-card">
              <div className="contact-name">{contact.companyName}</div>
              <div className="contact-address">{contact.companyAddress}</div>

              <div className="contact-email">📧 {contact.companyEmail}</div>
              <div className="contact-phone">📞 {contact.companyPhone}</div>

              <div className="card-actions">
                <Link to={`/edit/${contact.contact_id}`} className="edit-link">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(contact.contact_id)}
                  className={`delete-button ${isDeleting ? 'disabled' : ''}`}
                  disabled={isDeleting} // Disable the button while deleting
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-contacts">No contacts found.</p>
        )}
      </div>
    </div>
  );
}
