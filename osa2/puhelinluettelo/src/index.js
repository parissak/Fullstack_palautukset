import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
    const filtered = persons.filter(person => person.name.toLowerCase()
      .includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)

  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  let showPersons = persons
  if (newFilter !== '') {
    showPersons = filteredPersons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={newFilter} handleFilterInput={handleFilterInput} />

      <h3>add a new number</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <PersonList listPersons={showPersons} />
    </div >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);