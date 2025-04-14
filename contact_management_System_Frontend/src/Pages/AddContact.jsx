import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AddContact.css'; // Import the CSS for the Add Contact page
import apiUrl from "../apiURL";

export default function AddContact() {
  const [name, setCompanyName] = useState('');
  const [email, seCompanyEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      companyName: name,
      companyEmail: email,
      companyPhone: phone,
      companyAddress: address,
    };

    try {
      await fetch(`${apiUrl}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });

      navigate('/contacts');
    } catch (err) {
      console.error('Failed to add contact:', err.message);
    }
  };

  return (
    <div className="add-contact-container">
      <h2 className="add-contact-title">Add New Contact</h2>
      <form onSubmit={handleSubmit} className="add-contact-form">
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Company Email"
          value={email}
          onChange={(e) => seCompanyEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Company Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Company Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="textarea-field"
        />
        <button type="submit" className="submit-button">Add Contact</button>
      </form>
    </div>
  );
}
