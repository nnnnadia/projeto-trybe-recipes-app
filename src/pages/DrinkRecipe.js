import { Grid } from '@mui/material';
import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

function DrinkRecipe() {
  return (
    <Grid
      container
      justifyContent="center"
    >
      <RecipeDetails />
    </Grid>
  );
}

export default DrinkRecipe;
