import React, { useState } from 'react';
import axios from 'axios';
import "../../Login/css/Login.css";

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', { username: nickname, password });
      if (response.status === 201) {
        setSuccess('Registration successful! You can now log in.');
        setError('');
        setNickname('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Username already exists. Please choose another.');
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="button-login-signup">
          <nav className="login-signup">
            <a className="link" href="/login">
              <button className="btn-login-signup">Login</button>
            </a>
            <a className="link" href="/signup">
              <button className="btn-login-signup">Sign Up</button>
            </a>
          </nav>
        </div>
        <div className="text-wrapper">
          <h2 className="welcome-text">Sign Up</h2>
        </div>
        <ul className="input-box">
          <li className="li-input">
            <input
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </li>
          <li className="li-input">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li className="li-input">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
        </ul>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="button">
          <button className="login-button" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;