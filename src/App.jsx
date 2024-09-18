import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = () => {
  return axios
    .get(baseUrl)
    .then((response) => console.log(response.data))
    .catch((error) => console.log("Error: ", error));
};


const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getCountries().then((response) => setCountries(response));
  }, []);

  const displayCountries = () => {
    if (search) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
    displayCountries();
  }

  return (
    <div>
      <h1>Countries</h1>
  </div>
  )
};
export default App;
