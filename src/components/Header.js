import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, showSearchIcon }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  const toogleSearchBar = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };

  return (
    <header>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img src={ profileIcon } alt={ pageTitle } data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {showSearchIcon && (
        <button type="button" onClick={ toogleSearchBar }>
          <img src={ searchIcon } alt={ pageTitle } data-testid="search-top-btn" />
        </button>
      )}
      {showSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
