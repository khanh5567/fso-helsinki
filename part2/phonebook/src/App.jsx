import { useState, useEffect } from "react";
import personServer from "./server/Persons";
import Filter from "./components/Filter";
import Record from "./components/Record";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState(null);

  //call hook after message gets updated, might be redundant
  useEffect(() => {
    personServer.getAll().then((initialPersons) => setPersons(initialPersons));
  }, [message]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    let search = event.target.value;
    //includes return true if matches
    //using filter will reduce the list to only those that match
    let filterList = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filterList);
  };

  const setAndClearMessage = (message, type) => {
    const messageObject = {
      content: message,
      type: type,
    };
    setMessage(messageObject);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateList = (id, changedPerson) => {
    personServer
      .updatePerson(id, changedPerson)
      .then((updatedPerson) => {
        //map to the new one if the id matches the updating person
        //otherwise map to the same one, or nothing changes
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
        setNewName("");
        setNewNumber("");
        setAndClearMessage(`Updated ${updatedPerson.name}`, 1);
      })
      .catch((error) => {
        setAndClearMessage(`${newName} is not in the server`, 0);
      });
  };

  const addToList = (newPerson) => {
    personServer.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setAndClearMessage(`Added ${returnedPerson.name}`, 1);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //return object matches the name
    const existPerson = persons.find((person) => person.name === newName);
    const message = `${newName} is in the  phonebook, replace the old number?`;

    if (existPerson) {
      if (window.confirm(message)) {
        const id = existPerson.id;
        //create new object cause changing `existPerson` will also change the state persons
        const changedPerson = { ...existPerson, number: newNumber };
        updateList(id, changedPerson);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      addToList(newPerson);
    }
  };

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id).name;
    const confirm = window.confirm(`Delete ${name}`);
    if (confirm) {
      personServer
        .deletePerson(id)
        .then((res) => {
          //only update once delete is successful
          //filter out the id that is not deleted to display
          setPersons(persons.filter((person) => person.id !== id));
          setAndClearMessage(`${name} deleted`, 1);
        })
        .catch((error) => {
          setAndClearMessage(`${name} is not in the server`, 0);
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
      <Notification message={message} />
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
