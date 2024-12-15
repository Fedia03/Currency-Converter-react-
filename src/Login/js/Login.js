import React, { useState } from 'react';
import axios from 'axios';
import "../css/Login.css";

const Login = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', { username: nickname, password });
            console.log('Login successful:', response.data);

            setSuccessMessage('Login successful! Welcome, ' + response.data.user.username + '!');

            localStorage.setItem('isLoggedIn', 'true');

            window.location.href = '/main_content';

        } catch (err) {
            setError('Invalid username or password');
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <div className="wrapper">
                <div className="button-login-signup">
                    <nav className="login-signup">
                        <a className="link" href="/login"><li className="btn-login-signup">Login</li></a>
                        <a className="link" href="/signup"><li className="btn-login-signup">Sign Up</li></a>
                    </nav>
                </div>
                <div className="text-wrapper">
                    <h1 className="welcome-text">Login</h1>
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
                </ul>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="button">
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;