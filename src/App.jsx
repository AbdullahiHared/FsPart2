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

  // Filter change handler
  const handleFilterChange = (event) => {
    const searchValue = event.target.value;
    setSearchItem(searchValue);

    // Filter persons based on search value and update filteredUsers state
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredUsers(filteredPersons);
  };

  // Name change handler
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Number change handler
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return; // Exit if a duplicate is found
    }

    const personObject = {
      name: newName,
      number: newNumber,
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
    </div>
  );
};

export default App;
