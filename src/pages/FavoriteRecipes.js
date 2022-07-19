import React, { useContext } from 'react';
import CardRecipeFavorite from '../components/CardRecipeFavorite';
import Header from '../components/Header';
import SavedRecipesFilters from '../components/SavedRecipesFilters';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(RecipesContext);
  return (
    <div>
      <Header pageTitle="Favorite Recipes" showSearchIcon={ false } />
      <SavedRecipesFilters />
      { favoriteRecipes.map((recipe, index) => (
        <CardRecipeFavorite { ...recipe } index={ index } key={ index } />
      )) }
    </div>
  );
}

export default FavoriteRecipes;
