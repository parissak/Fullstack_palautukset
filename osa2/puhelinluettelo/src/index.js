import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [success, setSuccessfull] = useState(null)
  const [failure, setFailure] = useState(null)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setSuccessfull(`${person.name} deleted successfully`)
          setTimeout(() => {
            setSuccessfull(null)
          }, 2500)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {

      if (window.confirm(`${newName} is already added to the phonebook, 
      replace the old number with a new one?`)) {
        const oldP = persons.find(p => p.name === newName)
        const changedP = { ...oldP, number: newNumber }

        personService.update(changedP).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== oldP.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')

          setSuccessfull(`${newName}'s number changed successfully`)
          setTimeout(() => {
            setSuccessfull(null)
          }, 2500)
        }).catch(error => {
          setFailure(`${newName} has already been removed`)
          setPersons(persons.filter(p => p.id !== oldP.id))
          setTimeout(() => {
            setFailure(null)
          }, 2500)
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject).then(createdObject => {
        setPersons(persons.concat(createdObject))
        setNewName('')
        setNewNumber('')
      }).then(() => {
        setSuccessfull(`${newName} added successfully`)
        setTimeout(() => {
          setSuccessfull(null)
        }, 2500)
      }
      )
    }
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
    const filtered = persons.filter(person => person.name.toLowerCase()
      .includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)

  }

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  let showPersons = persons
  if (newFilter !== '') {
    showPersons = filteredPersons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={failure}/>
      <Notification message={success}/>

      <FilterForm value={newFilter} handleFilterInput={handleFilterInput} />

      <h3>add a new number</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <PersonList listPersons={showPersons} handleDeletePerson={handleDeletePerson} />
    </div >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);