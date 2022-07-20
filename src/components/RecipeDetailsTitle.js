import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetailsTitle({
  details,
  clickShare,
  setFavoritesRecipes,
  isFavorite,
  copied,
}) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <CardContent>
        <Typography
          variant="h4"
          data-testid="recipe-title"
        >
          { details.strMeal || details.strDrink }
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="share" onClick={ clickShare }>
          <img
            src={ shareIcon }
            alt="compartilhar"
            data-testid="share-btn"
          />
        </IconButton>
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
        </IconButton>
        {copied && <span>Link copied!</span>}
      </CardActions>
    </Stack>
  );
}

RecipeDetailsTitle.propTypes = {
  details: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  clickShare: PropTypes.func.isRequired,
  setFavoritesRecipes: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  copied: PropTypes.bool.isRequired,
};

export default RecipeDetailsTitle;
