import React from 'react';
import Header from '../components/Header';
import SavedRecipesFilters from '../components/SavedRecipesFilters';

function DoneRecipes() {
  return (
    <div>
      <Header pageTitle="Done Recipes" showSearchIcon={ false } />
      <SavedRecipesFilters />
    </div>
  );
}

export default DoneRecipes;
