import React, { useState } from 'react';
import './styles/auth.css';

const AuthPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleForm = () => {
    setIsSignUp(prev => !prev);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? 'https://backend-contact-management-system-10gj.onrender.com/signup'
      : 'https://backend-contact-management-system-10gj.onrender.com/signin';

    const payload = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Success:', data);
        onLogin(); // Update app state to reflect successful login
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span
                style={{ color: '#2563eb', cursor: 'pointer' }}
                onClick={toggleForm}
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                style={{ color: '#2563eb', cursor: 'pointer' }}
                onClick={toggleForm}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
