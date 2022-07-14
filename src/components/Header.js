import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, showSearchIcon }) {
  return (
    <header>
      <img src={ profileIcon } alt={ pageTitle } data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{pageTitle}</h1>
      {showSearchIcon && (
        <img src={ searchIcon } alt={ pageTitle } data-testid="search-top-btn" />
      )}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
