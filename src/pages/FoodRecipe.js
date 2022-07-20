import { Grid } from '@mui/material';
import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

function FoodRecipe() {
  return (
    <Grid
      container
      justifyContent="center"
    >
      <RecipeDetails />
    </Grid>
  );
}

export default FoodRecipe;
