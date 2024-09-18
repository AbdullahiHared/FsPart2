import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getCountries = () => {
  return axios
    .get('https://restcountries.com/v3.1/all')
    .then((response) => response.data)
    .catch((error) => console.log("Error: ", error));
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const printCountries = () => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    filteredCountries.forEach((country) => console.log(country.name.common));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  printCountries();

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search countries"
      />
      <ul>
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;