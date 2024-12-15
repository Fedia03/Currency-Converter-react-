import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Currency_converter.css';

const APP_ID = "2af016366e7b4a9f8e19db993080a3b6";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`);
                setCurrencies(Object.keys(response.data.rates));
                setExchangeRates(response.data.rates);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
    }, []);

    const handleConvert = (e) => {
        e.preventDefault();
        if (amount <= 0) {
            alert('Please enter an amount greater than 0');
            return;
        }

        const fromRate = exchangeRates[fromCurrency];
        const toRate = exchangeRates[toCurrency];

        if (fromRate && toRate) {
            const result = ((amount / fromRate) * toRate).toFixed(2);
            setConvertedAmount(result);
            console.log(`Conversion: ${amount} ${fromCurrency} = ${result} ${toCurrency}`);
        } else {
            alert('Error: Exchange rate is not available');
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="wrapper">
            <div className="text-wrapper">
                <h2 className="welcome-text">Currency Converter</h2>
            </div>
            <div className="amount-text">
                <h3 className="text-above-input">Enter amount</h3>
            </div>
            <div className="input-box">
                <input
                    type="number"
                    name="value"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <form onSubmit={handleConvert}>
                <div className="selection-from-to">
                    <div>
                        <label htmlFor="from">From</label>
                        <select
                            id="from"
                            name="from"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {loading ? (
                                <option>Loading currencies...</option>
                            ) : (
                                currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <button
                        className="button-swap"
                        type="button"
                        onClick={handleSwap}
                    >

                    </button>
                    <div>
                        <label htmlFor="to">To</label>
                        <select
                            id="to"
                            name="to"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {loading ? (
                                <option>Loading currencies...</option>
                            ) : (
                                currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>
                {convertedAmount && (
                    <div className="result">
                        <p className="output-info">{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
                    </div>
                )}
                <div className="button">
                    <button className="exchange-button" type="submit">Convert</button>
                </div>
            </form>
        </div>
    );
};

export default CurrencyConverter;