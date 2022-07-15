import React, { useState } from 'react';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <input
      data-testid="search-input"
      type="text"
      value={ searchInput }
      onChange={ ({ target }) => setSearchInput(target.value) }
    />
  );
}

export default SearchBar;
