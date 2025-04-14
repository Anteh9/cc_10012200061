import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/ContactList.css";
import apiUrl from './api';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/contacts`)
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
      setLoading(true);
      await fetch(`${apiUrl}/contacts/${id}`, {
        method: 'DELETE',
      });

      setContacts((prev) => prev.filter((contact) => contact.contact_id !== id));
      setMessage('Contact deleted successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError('Error deleting contact. Please try again.');
      console.error('Error deleting contact:', err);
    } finally {
      setIsDeleting(false);
      setLoading(false);
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

      {message && <div className="notification success">{message}</div>}
      {error && <div className="notification error">{error}</div>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="contact-cards">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.contact_id} className="contact-card">
              <div className="contact-name">{contact.companyName}</div>
              <div className="contact-address">{contact.companyAddress}</div>
              <div className="contact-email">📧 {contact.companyEmail}</div>
              <div className="contact-phone">📞 {contact.companyPhone}</div>
              <div className="card-actions">
                <Link to={`/edit/${contact.contact_id}`} className="edit-link">Edit</Link>
                <button
                  onClick={() => handleDelete(contact.contact_id)}
                  className={`delete-button ${isDeleting ? 'disabled' : ''}`}
                  disabled={isDeleting}
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
