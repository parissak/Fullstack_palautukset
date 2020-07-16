import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  const [filtered, setFiltered] = useState([])
   

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
 
 
  const handleFilter = (event) => {
    setInput(event.target.value)

    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries)
  }

  const chooseOneCountry = (country) => {
    setFiltered([country])
  }

  return (
    <div>
      <div>find countries
        <input value={input} onChange={handleFilter} />
      </div>
      <Countries list={filtered} chooseCountry={chooseOneCountry} />
    </div>
  )
}

export default App