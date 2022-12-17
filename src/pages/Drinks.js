import React from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <Container maxWidth="xs">
      <Header pageTitle="Drinks" showSearchIcon />
      <Grid
        container
        justifyContent="center"
      >
        <Recipes />
        <Footer />
      </Grid>
    </Container>
  );
}

export default Drinks;
