import React, { useContext } from 'react';
import CardRecipeDone from '../components/CardRecipeDone';
import Header from '../components/Header';
import SavedRecipesFilters from '../components/SavedRecipesFilters';
import RecipesProvider from '../context/RecipesProvider';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesProvider);
  return (
    <div>
      <Header pageTitle="Done Recipes" showSearchIcon={ false } />
      <SavedRecipesFilters />
      { doneRecipes.map((recipe, index) => (
        <CardRecipeDone { ...recipe } index={ index } key={ index } />
      ))}
    </div>
  );
}

export default DoneRecipes;
