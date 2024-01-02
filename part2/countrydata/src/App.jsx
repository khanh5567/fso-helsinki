import { useState, useEffect } from "react";
import axios from "axios";

const Record = ({ country }) => {
  let languages = Object.values(country.languages);
  return (
    <>
      <h2>{country.name.common}</h2>
      capital {country.capital[0]} <br></br>
      area {country.area}
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flag}
        style={{ width: "20%" }}
      />
    </>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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
        })
        .catch((error) => console.log("error occurred"));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        find countries <input onChange={handleSearch} value={search}></input>
      </form>
      {result.length > 10 ? (
        "Too many matches, try again"
      ) : result.length == 1 ? (
        <Record country={result[0]} />
      ) : (
        result.map((country) => <div>{country.name.common}</div>)
      )}
    </>
  );
}

export default App;
