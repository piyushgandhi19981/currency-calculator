import React, { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";

import Dropdown from "./Dropdown";

const CurrencyConvertor = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error Fetching", error);
      }
    })();
  }, []);

  const currencyConvert = async () => {
    if (!amount) return;
    if (fromCurrency === toCurrency) alert("Both Currencies are same");
    setConverting(true);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    const data = await res.json();
    setConverting(false);
    setConvertedAmount(data?.rates?.[toCurrency].toFixed(2) + " " + toCurrency);
  };
  // Currencies -> https://api.frankfurter.app/currencies
  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

  const handleFavorite = (currency) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(currency)) {
      newFavorites = newFavorites.filter((fav) => fav !== currency);
    } else {
      newFavorites = [...newFavorites, currency];
    }
    setFavorites(newFavorites);
    window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
    // add to favorites
  };

  const handleSwapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <Dropdown
          currency={fromCurrency}
          currencies={currencies}
          handleFavorite={handleFavorite}
          setCurrency={setFromCurrency}
          favorites={favorites}
          title="From"
        />
        <div className="swap-container">
          <button onClick={handleSwapCurrency} className="swap-btn">
            <HiArrowsRightLeft />
          </button>
        </div>
        {/* swap currency */}
        <Dropdown
          handleFavorite={handleFavorite}
          currency={toCurrency}
          setCurrency={setToCurrency}
          currencies={currencies}
          favorites={favorites}
          title="To"
        />
      </div>
      <div className="amount-container">
        <label>Amount: </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
      </div>
      <div className="convert">
        <button
          disabled={converting}
          className="convert-btn"
          onClick={currencyConvert}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="new-amount">Converted Amount: {convertedAmount}</div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
