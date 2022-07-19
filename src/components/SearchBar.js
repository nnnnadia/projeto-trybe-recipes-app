import {
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
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
    <Grid
      container
      spacing={ 1 }
      padding={ 1 }
      justifyContent="center"
    >
      <Grid item>
        <Grid container spacing={ 1 }>
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              data-testid="search-input"
              value={ searchInput }
              placeholder="Digite a sua busca"
              onChange={ ({ target }) => setSearchInput(target.value) }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={ handleSearchButton }
              data-testid="exec-search-btn"
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={ typeOfSearch }
          exclusive
          onChange={ ({ target }) => setTypeOfSearch(target.value) }
        >
          <ToggleButton
            value="ingredient"
            checked={ typeOfSearch === 'ingredient' }
            data-testid="ingredient-search-radio"
          >
            Ingrediente
          </ToggleButton>
          <ToggleButton
            value="name"
            checked={ typeOfSearch === 'name' }
            data-testid="name-search-radio"
          >
            Nome
          </ToggleButton>
          <ToggleButton
            value="first-letter"
            checked={ typeOfSearch === 'first-letter' }
            data-testid="first-letter-search-radio"
          >
            Primeira letra
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
