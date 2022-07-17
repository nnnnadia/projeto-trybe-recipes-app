import React, { useState, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('ingredient');

  const { setSearch } = useContext(RecipesContext);

  const handleSearchButton = () => {
    if (typeOfSearch === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setSearch({
        text: searchInput,
        option: typeOfSearch,
      });
      setSearchInput('');
      setTypeOfSearch('ingredient');
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        id="search-input"
        placeholder="Digite a sua busca"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div>
        <label className="input-label" htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search"
            value="ingredient"
            checked={ typeOfSearch === 'ingredient' }
            onChange={ ({ target }) => setTypeOfSearch(target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search"
            value="name"
            onChange={ ({ target }) => setTypeOfSearch(target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search"
            value="first-letter"
            onChange={ ({ target }) => setTypeOfSearch(target.value) }
          />
          Primeira letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearchButton }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
