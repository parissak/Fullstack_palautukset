import React from 'react'
import Person from './Person'
 
const PersonList = ({ listPersons }) => {
    return (
        <ul> {listPersons.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
        )}
        </ul>
    )
}

export default PersonList