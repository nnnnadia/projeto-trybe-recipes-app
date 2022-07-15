import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Foods() {
  return (
    <div>
      <Header pageTitle="Foods" showSearchIcon />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
