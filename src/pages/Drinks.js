import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

function Drinks() {
  return (
    <div>
      <Header
        pageTitle="Drinks"
        searchIcon={ searchIcon }
      />
    </div>
  );
}

export default Drinks;
