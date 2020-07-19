import React from 'react'
import Person from './Person'

const PersonList = ({ listPersons, handleDeletePerson }) => {
    return (
        <ul> {listPersons.map(person =>
            <Person key={person.id} person={person}  
            handleDeletePerson = {handleDeletePerson} />
        )}
        </ul >
    )
}

export default PersonList