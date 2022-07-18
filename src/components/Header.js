import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AppBar, Grid, IconButton, Toolbar } from '@mui/material';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import HeaderTitle from '../styles/StyledComponents';

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
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <IconButton
            size="large"
            onClick={ () => history.push('/profile') }
          >
            <img
              src={ profileIcon }
              alt="perfil"
              data-testid="profile-top-btn"
            />
          </IconButton>
          <HeaderTitle
            variant="h4"
            data-testid="page-title"
          >
            { pageTitle }
          </HeaderTitle>
          {showSearchIcon && (
            <IconButton
              size="large"
              onClick={ toogleSearchBar }
            >
              <img
                src={ searchIcon }
                alt="buscar"
                data-testid="search-top-btn"
              />
            </IconButton>
          )}
        </Grid>
      </Toolbar>
      {showSearchBar && <SearchBar />}
    </AppBar>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
