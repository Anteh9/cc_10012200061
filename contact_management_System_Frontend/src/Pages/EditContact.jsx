import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./styles/EditContact.css";
import apiUrl from "../apiURL";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalContact, setOriginalContact] = useState(null); // original from DB
  const [editedContact, setEditedContact] = useState({}); // only changes

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch contact from backend
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${apiUrl}/contacts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch contact');
        const data = await res.json();
        setOriginalContact(data);
        setEditedContact(data); // prefill form
      } catch (err) {
        setError('Error fetching contact data');
        console.error(err);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedContact = {
      ...originalContact,
      ...editedContact,
    };

    try {
      const res = await fetch('https://backend-contact-management-system-10gj.onrender.com/contacts/${id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (!res.ok) throw new Error('Failed to update contact');
      navigate('/contacts');
    } catch (err) {
      console.error(err);
      setError('Error updating contact');
    } finally {
      setLoading(false);
    }
  };

  if (!originalContact) return <p>Loading contact...</p>;

  return (
    <div className="edit-contact-container">
      <h2 className="title">Edit Contact</h2>

      {error && <div className="notification error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="companyName" className="label">Company Name</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={editedContact.companyName || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyEmail" className="label">Company Email</label>
          <input
            id="companyEmail"
            name="companyEmail"
            type="email"
            value={editedContact.companyEmail || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyPhone" className="label">Company Phone</label>
          <input
            id="companyPhone"
            name="companyPhone"
            type="text"
            value={editedContact.companyPhone || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyAddress" className="label">Company Address</label>
          <input
            id="companyAddress"
            name="companyAddress"
            type="text"
            value={editedContact.companyAddress || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="submit-button-container">
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Updating...' : 'Update Contact'}
          </button>
        </div>
      </form>
    </div>
  );
}
