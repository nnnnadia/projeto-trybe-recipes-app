import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ pageTitle, searchIcon }) {
  return (
    <header>
      <img src={ profileIcon } alt={ pageTitle } data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{ pageTitle }</h1>
      <img src={ searchIcon } alt={ pageTitle } data-testid="search-top-btn" />
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchIcon: PropTypes.string.isRequired,
};

export default Header;
