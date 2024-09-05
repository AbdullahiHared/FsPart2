import { useState } from 'react';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [searchItem, setSearchItem] = useState('');
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
      id: String(persons.length + 1),
    };

    const updatedPersons = persons.concat(personObject);
    setPersons(updatedPersons);

    // Update filteredUsers based on current search value
    if (searchItem) {
      setFilteredUsers(updatedPersons.filter((person) =>
        person.name.toLowerCase().includes(searchItem.toLowerCase())
      ));
    } else {
      setFilteredUsers(updatedPersons); // If no search term, show all
    }

    setNewName('');
    setNewNumber(''); // Clear the new number field as well
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={searchItem} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <label htmlFor="name">Name</label>
        <input id="name" value={newName} onChange={handleNameChange} />

        <label htmlFor="number">Number</label>
        <input type="number" id="number" value={newNumber} onChange={handleNumberChange} />

        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredUsers.map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
