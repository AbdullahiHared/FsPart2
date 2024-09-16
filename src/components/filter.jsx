const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search..."
        />
      </div>
    );
  };
  
  export default Filter;