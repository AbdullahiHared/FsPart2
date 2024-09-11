<<<<<<< HEAD
import { useState } from "react";
import Filter from "./components/Filter";
import axios from "axios";

const baseUrl = "http://localhost:3001/people";

const postPersonObject = (personObject) => {
  return axios
    .post(baseUrl, personObject)
    .then((response) => console.log("Response: ", response.data))
    .catch((error) => console.log("Error: ", error));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(persons);
=======
import { useState, useEffect } from 'react'
import axios from 'axios'
import People from './components/People'

const App = () => {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [number, setNumber] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
>>>>>>> 845b41fad46cf2311637efd6ac6655541ffc1b1e


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
<<<<<<< HEAD
      id: persons.length + 1, 
    };

    const updatedPersons = persons.concat(personObject);
    setPersons(updatedPersons);

    // Update filteredUsers based on current search value
    if (searchItem) {
      setFilteredUsers(
        updatedPersons.filter((person) =>
          person.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(updatedPersons); // If no search term, show all
    }

    // Post the new person to the backend
    postPersonObject(personObject);

    // Clear input fields
    setNewName("");
    setNewNumber("");
  };
=======
      id: people.length + 1,
    }

    setPeople(people.concat(personObject))
    setNewPerson('')
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        console.log('promise fulfilled')
        console.log('response.data', response.data);
        setPeople(response.data)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])
>>>>>>> 845b41fad46cf2311637efd6ac6655541ffc1b1e

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
  
    // Ensure the person exists before attempting to delete
    if (!person) {
      console.log(`Person with id ${id} not found.`);
      return;
    }
  
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
  
    if (confirmDelete) {
      // Send DELETE request to backend
      axios
        .delete(`${baseUrl}/${id}`)
        .then(() => {
          // Update local state after successful deletion
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);

          setFilteredUsers(updatedPersons); // Update filteredUsers state
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert(`Failed to delete ${person.name}. Please try again later.`);
        });
    }
  };
  
  return (
    <div>
<<<<<<< HEAD
      <h2>Phonebook</h2>
      <Filter filter={searchItem} handleFilterChange={handleFilterChange} />

      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
        <label htmlFor="name">Name</label>
        <input id="name" value={newName} onChange={handleNameChange} />

        <label htmlFor="number">Number</label>
        <input
          type="number"
          id="number"
          value={newNumber}
          onChange={handleNumberChange}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredUsers.map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}
            <br />
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
=======
    <h2>People</h2>
    <form onSubmit={addPerson}>
      <input 
        value={newPerson}
        onChange={(event) => setNewPerson(event.target.value)}
      />
      <button type="submit" onSubmit={handlePersonChange}>add</button>
    </form>
    <ul>
      {people.map(person => 
        <People key={person.id} person={person} />
      )}

    </ul>
>>>>>>> 845b41fad46cf2311637efd6ac6655541ffc1b1e
    </div>
  )

};

export default App