import { useState, useEffect } from 'react'
import axios from 'axios'
import People from './components/People'

const App = () => {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [number, setNumber] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
      id: people.length + 1,
    }

    setPeople(people.concat(personObject))
    setNewPerson('')
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        console.log('promise fulfilled')
        setPeople(response.data)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])

  return (
    <div>
    <h2>People</h2>
    <form onSubmit={addPerson}>
      <input 
        value={newPerson}
        onChange={(event) => setNewPerson(event.target.value)}
      />
      <button type="submit">add</button>
    </form>
    <ul>
      {people.map(person => 
        <People key={person.id} person={person} />
      )}

    </ul>
    </div>
  )

};

export default App