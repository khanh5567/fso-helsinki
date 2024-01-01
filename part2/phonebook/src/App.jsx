import { useState, useEffect } from "react";
import personServer from "./server/Persons";
import { Filter, Form, Record } from "./components/index";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    personServer.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    let search = event.target.value;
    let filterList = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filterList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const exist = persons.find((person) => person.name === newName);

    if (exist) alert(`${newName} is already added to the phonebook`);
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personServer.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id).name;

    if (window.confirm(`Delete ${name}`)) {
      personServer
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderPersons = (people) =>
    people.map((person) => (
      <Record key={person.name} person={person} handleDelete={handleDelete} />
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      {search !== "" ? renderPersons(filter) : renderPersons(persons)}
    </div>
  );
};

export default App;
