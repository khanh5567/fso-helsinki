import { useState } from "react";

const Record = (props) => {
  const { person } = props;

  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Filter = (props) => {
  const { search, handleSearchChange } = props;
  return (
    <div>
      search: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

const Form = (props) => {
  const {
    handleSubmit,
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

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
      person.name.toLowerCase().includes(search)
    );
    setFilter(filterList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let exist = false;

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) exist = true;
    }

    if (exist) alert(`${newName} is already added to the phonebook`);
    else {
      let newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

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

      {search !== ""
        ? filter.map((person) => <Record key={person.name} person={person} />)
        : persons.map((person) => <Record key={person.name} person={person} />)}
    </div>
  );
};

export default App;
