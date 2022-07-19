import React from 'react';
import { Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" showSearchIcon />
      <Grid
        container
        justifyContent="center"
      >
        <Recipes />
        <Footer />
      </Grid>
    </div>
  );
}

export default Drinks;
