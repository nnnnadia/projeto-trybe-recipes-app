import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton({
  id,
  index,
  favoritesRecipes,
  updateFavoritesRecipes,
}) {
  return (
    <Fab
      aria-label="share"
      onClick={ () => updateFavoritesRecipes(id) }
      sx={ { position: 'absolute', right: 10, top: 75 } }
    >
      {favoritesRecipes.some((favorite) => favorite.id === id) ? (
        <img
          src={ blackHeartIcon }
          alt="favoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      ) : (
        <img
          src={ whiteHeartIcon }
          alt="favoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      )}
    </Fab>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  favoritesRecipes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  updateFavoritesRecipes: PropTypes.func.isRequired,
};

export default FavoriteButton;
