import { Grid } from '@mui/material';
import React from 'react';
import RecipeDetails from '../components/RecipeDetails';
import DetailsProvider from '../context/DetailsProvider';

function FoodRecipe() {
  return (
    <DetailsProvider>
      <Grid
        container
        justifyContent="center"
      >
        <RecipeDetails />
      </Grid>
    </DetailsProvider>
  );
}

export default FoodRecipe;
