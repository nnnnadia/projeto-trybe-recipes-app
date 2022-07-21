import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import DetailsContext from '../../context/DetailsContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton() {
  const { isFavorite, setFavoritesRecipes } = useContext(DetailsContext);

  return (
    <IconButton aria-label="favorite" onClick={ setFavoritesRecipes }>
      {isFavorite ? (
        <img
          src={ blackHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
        />
      ) : (
        <img
          src={ whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
        />
      )}
    </IconButton>);
}

export default FavoriteButton;
