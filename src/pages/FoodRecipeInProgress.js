import { Grid } from '@mui/material';
import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import DetailsProvider from '../context/DetailsProvider';

function FoodRecipeInProgress() {
  return (
    <DetailsProvider>
      <Grid
        container
        justifyContent="center"
      >
        <RecipeInProgress />
      </Grid>
    </DetailsProvider>
  );
}

export default FoodRecipeInProgress;
