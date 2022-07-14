import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';

function Foods() {
  return (
    <div>
      <Header
        pageTitle="Foods"
        searchIcon={ searchIcon }
      />
    </div>
  );
}

export default Foods;
