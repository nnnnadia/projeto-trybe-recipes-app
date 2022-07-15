import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, showSearchIcon }) {
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } alt={ pageTitle } data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {showSearchIcon && (
        <button type="button">
          <img src={ searchIcon } alt={ pageTitle } data-testid="search-top-btn" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
