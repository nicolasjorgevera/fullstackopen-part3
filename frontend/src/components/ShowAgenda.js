import React from "react"
import Person from './Person'

const ShowAgenda = ({personsToShow , deletePerson}) => {
    return (
    <ul>
        {personsToShow.map(person => (<Person key={person.name} person={person} deletePerson={()=>deletePerson(person.id)}/>))}
    </ul>
    )
}



export default ShowAgenda