import { useState, useEffect } from "react";
import personServer from "./server/Persons";
import { Filter, Form, Record } from "./components/index";

const Notif = (props) => {
  const inlineCSS = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (props.message !== null) {
    return <div className="notif">{props.message}</div>;
  } else if (props.error !== null) {
    return <div style={inlineCSS}>{props.error}</div>;
  } else return null;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  //remove persons to test 2.17, otherwise bug cannot be recreated
  useEffect(() => {
    personServer.getAll().then((initialPersons) => setPersons(initialPersons));
  }, [persons]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    //return object matches the name
    const exist = persons.find((person) => person.name === newName);
    const message = `${newName} is already added to the phonebook, replace the old number with a new one?`;

    if (exist) {
      if (window.confirm(message)) {
        const id = exist.id;
        //create new object cause changing `exist` will also change the state persons
        const changedPerson = { ...exist, number: newNumber };
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
            setMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setError(`${newName} is not in the server`);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personServer.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const handleDelete = (id) => {
    const name = persons.find((person) => person.id === id).name;

    if (window.confirm(`Delete ${name}`)) {
      personServer
        .deletePerson(id)
        .then((res) => {
          //only update once delete is successful
          //filter out the id that is not deleted to display
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setError(`${name} is not in the server`);
          setTimeout(() => {
            setError(null);
          }, 5000);
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
      <Notif message={message} error={error} />
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
