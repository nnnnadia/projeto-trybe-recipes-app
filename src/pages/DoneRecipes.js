import React, { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import Header from '../components/Header';
import { SavedRecipesFilters, CardRecipeDone } from '../components/ProfileComponents';
import { readStorageDoneRecipes } from '../services/recipesLocalStorage';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const done = readStorageDoneRecipes();
    setDoneRecipes(done);
  }, []);

  useEffect(() => {
    if (filter !== 'all') {
      const doneFiltered = doneRecipes.filter(
        (recipe) => recipe.type === filter,
      );
      setFilteredRecipes(doneFiltered);
    }
  }, [filter, doneRecipes]);

  const recipesToShow = () => {
    if (filter === 'all') {
      return doneRecipes;
    }
    return filteredRecipes;
  };

  return (
    <Container maxWidth="xs">
      <Header pageTitle="Done" showSearchIcon={ false } />
      <Stack
        alignItems="center"
      >
        <SavedRecipesFilters filter={ filter } setFilter={ setFilter } />
        <Box sx={ { width: 345 } }>
          {recipesToShow().map((recipe, index) => (
            <CardRecipeDone key={ recipe.id } index={ index } { ...recipe } />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}

export default DoneRecipes;
