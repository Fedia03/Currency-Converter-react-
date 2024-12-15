import React, { useState, useEffect } from 'react';
import axios from 'axios';
import starIcon from '../../icon/add-favorite.png'; 
import starFilledIcon from '../../icon/remove-favorite.png';
import "../css/Currency_rates.css";

const CurrencyRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fetch exchange rates
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://openexchangerates.org/api/latest.json?app_id=2af016366e7b4a9f8e19db993080a3b6');
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                setRates(response.data.rates);
            } catch (error) {
                console.error('Error fetching rates:', error.response ? error.response.data : error.message);
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsAuthenticated(loggedInStatus);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const userId = localStorage.getItem('userId');
            const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
            setFavorites(storedFavorites);
        }
    }, [isAuthenticated]);

    const toggleFavorite = (currency) => {
        if (!isAuthenticated) {
            alert('You need to be logged in to add to favorites!');
            return;
        }

        const userId = localStorage.getItem('userId');
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(currency)
                ? prevFavorites.filter(fav => fav !== currency)
                : [...prevFavorites, currency];

            localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Sort rates with favorites at the top
    const sortedRates = Object.entries(rates).sort(([currencyA], [currencyB]) => {
        const isAFavorite = favorites.includes(currencyA);
        const isBFavorite = favorites.includes(currencyB);
        return isAFavorite === isBFavorite ? 0 : isAFavorite ? -1 : 1;
    });

    return (
        <div className="currency-rates">
            <h2 className="table-title">Current Exchange Rates</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rate (USD)</th>
                            {isAuthenticated && <th>Favorites</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRates.map(([currency, rate]) => (
                            <tr key={currency}>
                                <td>{currency}</td>
                                <td>{rate.toFixed(4)}</td>
                                {isAuthenticated && (
                                    <td>
                                        <button
                                            className="button-favorite"
                                            onClick={() => toggleFavorite(currency)}
                                            aria-label={favorites.includes(currency) ? 'Remove from Favorites' : 'Add to Favorites'}
                                        >
                                            <img
                                                src={favorites.includes(currency) ? starFilledIcon : starIcon}
                                                alt=""
                                                style={{ width: '32px', height: '32px' }}
                                            />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurrencyRates;