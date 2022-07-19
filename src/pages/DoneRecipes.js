import React, { useContext } from 'react';
import CardRecipeDone from '../components/CardRecipeDone';
import Header from '../components/Header';
import SavedRecipesFilters from '../components/SavedRecipesFilters';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesContext);
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
