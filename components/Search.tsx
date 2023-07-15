import React from "react";

const Search = () => {
  return (
    <div>
      <div className="flex-center w-full mt-4">
        <input
          className="form_field-input max-w-[800px]"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <button></button>
    </div>
  );
};

export default Search;
