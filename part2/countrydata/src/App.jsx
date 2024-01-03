import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const baseURL = "openweathermap.org";

const Record = ({ country, weather }) => {
  let languages = Object.values(country.languages);
  if (weather === null) return null;
  return (
    <>
      <h2>{country.name.common}</h2>
      capital {country.capital[0]} <br></br>
      area {country.area}
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flag}
        style={{ width: "20%" }}
      />
      <h3>Weather in {country.capital[0]}</h3>
      <div>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
      <img
        src={`https://${baseURL}/img/wn/${weather.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  );
};

const CountryList = ({ country, handleClick }) => {
  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => handleClick(country.cca3)}>show</button>
      <br></br>
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (result.length > 0) {
      const capital = result[0].capital[0];
      axios
        .get(
          `https://api.${baseURL}/data/2.5/weather?q=${capital}&unit=imperial&APPID=${api_key}`
        )
        .then((res) => setWeather(res.data))
        .catch((error) => console.log("error: ", error));
    }
  }, [result]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search !== "") {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => {
          const searchResult = res.data.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          );
          setResult(searchResult);
          setSearch("");
        })
        .catch((error) => console.log("error occurred"));
    }
  };

  const handleClick = (id) => {
    let showCountry = result.filter((country) => country.cca3 === id);
    setResult(showCountry);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        find countries <input onChange={handleSearch} value={search}></input>
      </form>
      {result.length > 10 ? (
        "Too many matches, try again"
      ) : result.length === 0 ? (
        "No matches"
      ) : result.length === 1 ? (
        <Record country={result[0]} weather={weather} />
      ) : (
        result.map((country) => (
          <CountryList
            key={country.cca3}
            country={country}
            handleClick={handleClick}
          />
        ))
      )}
    </>
  );
}

export default App;
