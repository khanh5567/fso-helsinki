const Filter = (props) => {
  const { search, handleSearchChange } = props;
  return (
    <div>
      search: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
