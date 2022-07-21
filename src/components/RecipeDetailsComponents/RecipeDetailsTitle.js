import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CardActions, CardContent, Stack, Typography } from '@mui/material';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import DetailsContext from '../../context/DetailsContext';

function RecipeDetailsTitle() {
  const { details } = useContext(DetailsContext);
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
        <ShareButton />
        <FavoriteButton />
      </CardActions>
    </Stack>
  );
}

RecipeDetailsTitle.propTypes = {
  details: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailsTitle;
