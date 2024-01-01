const Record = (props) => {
  const { person, handleDelete } = props;
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
};

export default Record;
