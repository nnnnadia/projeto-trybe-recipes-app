import { Grid } from '@mui/material';
import React from 'react';
import RecipeDetails from '../components/RecipeDetails';
import DetailsProvider from '../context/DetailsProvider';

function DrinkRecipe() {
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

export default DrinkRecipe;
