import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import Header from '../components/Header';
import {
  readStorageFavoriteRecipes,
} from '../services/recipesLocalStorage';
import { SavedRecipesFilters } from '../components/ProfileComponents';
import CardRecipeFavorite from '../components/ProfileComponents/CardRecipeFavorite';

function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const favorite = readStorageFavoriteRecipes();
    setFavoritesRecipes(favorite);
  }, [update]);

  useEffect(() => {
    if (filter !== 'all') {
      const favoriteFiltered = favoritesRecipes.filter(
        (recipe) => recipe.type === filter,
      );
      setFilteredRecipes(favoriteFiltered);
    }
  }, [filter]);

  const recipesToShow = () => {
    if (filter === 'all') {
      return favoritesRecipes;
    }
    return filteredRecipes;
  };

  const updateFavoritesRecipes = (id) => {
    const removeFavorite = favoritesRecipes.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));

    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  return (
    <div>
      <Header pageTitle="Favorites" showSearchIcon={ false } />
      <Stack
        alignItems="center"
      >
        <SavedRecipesFilters filter={ filter } setFilter={ setFilter } />
        <Box sx={ { width: 345 } }>
          {recipesToShow().map((recipe, index) => (
            <CardRecipeFavorite
              key={ recipe.id }
              index={ index }
              favoritesRecipes={ favoritesRecipes }
              updateFavoritesRecipes={ updateFavoritesRecipes }
              { ...recipe }
            />
          ))}
        </Box>
      </Stack>
    </div>
  );
}

export default FavoriteRecipes;
