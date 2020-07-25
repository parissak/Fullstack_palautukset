import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = filter.length === 1 ?
    countries :
    countries.filter(c => c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  return (
    <div>
      <Search value={filter} setValue={setFilter} />
      <Countries list={filteredCountries} chooseOne={setFilter} />
    </div>
  )
}

const Search = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>find countries
      <input value={value} onChange={handleChange} />
    </div>
  )
}

export default App