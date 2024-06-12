import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites = ["USD"],
  handleFavorite,
  title = "",
}) => {
  const options = Object.keys(currencies);

  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      <label className="select-label" htmlFor={title}>
        {title}
      </label>
      <div className="select-container">
        <select
          className="selectsir"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {favorites.map((curr) => {
            return (
              <>
                <option
                  className="select-option-favorite"
                  value={curr}
                  key={curr}
                >
                  {curr}
                </option>
              </>
            );
          })}
          <hr />
          {options.map((curr) =>
            isFavorite(curr) ? null : (
              <>
                <option className="select-option" value={curr} key={curr}>
                  {curr}
                </option>
              </>
            )
          )}
        </select>
        <button onClick={() => handleFavorite(currency)} className="icon-class">
          <div className="favoriteIcon">
            {isFavorite(currency) ? (
              <HiStar className="filled" />
            ) : (
              <HiOutlineStar />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
