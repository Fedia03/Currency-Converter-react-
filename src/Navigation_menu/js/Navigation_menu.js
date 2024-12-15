import React, { useState, useEffect } from 'react';
import "../css/Navigation_menu.css";

const Navigation_menu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <div className="navigation-menu">
            <div className="nav-menu">
                <nav className="navbar">
                    <a className="currency-converter" href="/main_content">
                        <li className='btn'>Currency converter</li>
                    </a>
                    <a className="exchange-rates" href="/exchange_rates">
                        <li className='btn'>Exchange rates</li>
                    </a>
                    <a className="login" href={isLoggedIn ? "/logout" : "/login"} onClick={isLoggedIn ? handleLogout : undefined}>
                        <li className='btn'>{isLoggedIn ? 'Log out' : 'Sign in'}</li>
                    </a>
                </nav>
            </div>
        </div>
    );
}

export default Navigation_menu;