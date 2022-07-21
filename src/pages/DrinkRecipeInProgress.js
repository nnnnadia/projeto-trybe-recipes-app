import React from 'react';
import { Grid } from '@mui/material';
import RecipeInProgress from '../components/RecipeInProgress';
import DetailsProvider from '../context/DetailsProvider';

function DrinkRecipeInProgress() {
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

export default DrinkRecipeInProgress;
