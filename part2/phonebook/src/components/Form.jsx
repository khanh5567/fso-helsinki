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

export default Form;
