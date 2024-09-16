import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/people";

const getPersons = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => console.log("Error: ", error));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getPersons()
      .then((data) => {
        setPersons(data);
        setFilteredUsers(data); // Initialize filteredUsers with the fetched data
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

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

    if (
      persons.some(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      alert(
        `${newName} with number ${newNumber} is already added to phonebook`
      );
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      axios
        .post(baseUrl, newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setFilteredUsers(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotification(`Added ${newPerson.name}`);
          setTimeout(() => {
            setNotification("");
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(error.response?.data || error.message);
          console.error("Error in adding person:", error);
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!person) {
      console.log(`Person with id ${id} not found.`);
      return;
    }

    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      const deleteUrl = `${baseUrl}/${id}`;
      console.log(`Sending DELETE request to: ${deleteUrl}`);

      axios
        .delete(deleteUrl)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setFilteredUsers(updatedPersons);
          setNotification(`Deleted ${person.name}`);
          setTimeout(() => {
            setNotification("");
          }, 5000);
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
      {notification && <div className="success">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div>
        filter shown with{" "}
        <input value={searchItem} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        {filteredUsers.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
