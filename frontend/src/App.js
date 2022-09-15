import React, { useState , useEffect} from 'react'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import ShowAgenda from './components/ShowAgenda'
import personServices from './services/persons.js'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [noteMessage, setNoteMessage] = useState(null)
  const [noteSuccess, setNoteSuccess] = useState(true)

  const hook = () => {
    personServices
        .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
    })
}

useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  setNewFilter(event.target.value)
}
const addPerson = (event) => {
  event.preventDefault()
  const personNew = {
      name: newName,
      number: newNumber
  }

  if (persons.findIndex(person => person.name === newName) === -1){
    personServices
      .create(personNew)
      .then (retunedPerson => {
        setPersons(persons.concat(retunedPerson))
        setNewName('')
        setNewNumber('')
        setNoteMessage(`Added '${personNew.name}'`)
        setNoteSuccess(true)
        setTimeout(() => {setNoteMessage(null)}, 5000)
      })
      .catch(error => {
        setNoteSuccess(false)
        setNoteMessage(`ERROR: '${error.response.data.error}'`)
        setTimeout(() => {setNoteMessage(null)}, 5000)
        console.log("ERROR: ",error.response.data.error)
        }
      )

  }
  else{
    if (!window.confirm(`${newName} is already added to phonebook, replace de old number with a new one?`)) return  
    const personNewPhone = {...personNew , id : persons.filter(person => person.name === newName)[0].id}
    personServices
      .update (personNewPhone.id, personNewPhone)
      .then (returnedPerson => {
        setPersons(persons.map(person => person.id !== personNewPhone.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNoteMessage(`${personNew.name} was updated`)
        setNoteSuccess(true)
        setTimeout(() => {setNoteMessage(null)}, 5000)
      })
      .catch(error => {
        setNoteSuccess(false)
        setNoteMessage(`ERROR: '${error.response.data.error}`)
        setTimeout(() => {setNoteMessage(null)}, 5000)
        //setPersons(persons.filter(p => p.id !== personNewPhone.id))
    })
  }
  setNewName('')
  setNewNumber('')
}

const personsToShow = (newFilter === '')
? persons
: persons.filter(note => note.name.toLocaleUpperCase().includes(newFilter.toLocaleUpperCase())) 

const deletePerson = (id) =>{
  const person = persons.find(p => p.id === id)
  if (!window.confirm(`Delete ${person.name}?`)) return
  personServices
    .deletePerson(id)
    .then (() => {
      setPersons (persons.filter(p => p.id !== id))
      setNoteMessage(`The person ${person.name} was deleted`)
      setNoteSuccess(true)
      setTimeout(() => {setNoteMessage(null)}, 5000)
    })
    .catch(()=> {
      setNoteMessage(`The person ${person.name} was already deleted from the server`)
      setNoteSuccess(false)
      setTimeout(() => {setNoteMessage(null)}, 5000)
    }
    )
}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={noteMessage} success={noteSuccess}/>
      <Filter Filter={newFilter} onChangeFilter={handleFilterChange}/>
      <h2>Add new</h2>
      <AddNew onSubmit={addPerson} name={newName} onChangeName={handleNameChange} number={newNumber} onChangeNumber={handleNumberChange} />
      <div>Debug: {newName} {newNumber}</div>
      <h2>Numbers</h2>
      <ShowAgenda personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
    
  )
}

export default App