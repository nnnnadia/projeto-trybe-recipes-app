import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import RecipesContext from '../../context/RecipesContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function CardRecipeFavorite({
  id,
  type,
  image,
  nationality,
  category,
  alcoholicOrNot,
  name,
  index,
  favoritesRecipes,
  updateFavoritesRecipes,
}) {
  const { handlePageOn } = useContext(RecipesContext);

  const getCaption = () => {
    const captionOptions = [nationality, category, alcoholicOrNot];
    const captionString = captionOptions.filter((option) => option !== '').join(' - ');
    return captionString;
  };

  const goToDetails = () => {
    if (type === 'food') {
      return `/foods/${id}`;
    }
    return `/drinks/${id}`;
  };

  return (
    <Card key={ id } sx={ { maxWidth: 345, mb: 1, position: 'relative' } }>
      <CardActionArea
        onClick={ () => handlePageOn(goToDetails()) }
      >
        <CardMedia
          component="img"
          height="140"
          image={ image }
          alt="Foto da receita"
          data-testid={ `${index}-horizontal-image` }
        />
        <CardContent>
          <Typography
            variant="h5"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            display="block"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { getCaption() }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ShareButton
          type={ type }
          id={ id }
          index={ index }
        />
        <FavoriteButton
          id={ id }
          index={ index }
          favoritesRecipes={ favoritesRecipes }
          updateFavoritesRecipes={ updateFavoritesRecipes }
        />
      </CardActions>
    </Card>
  );
}

CardRecipeFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  favoritesRecipes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  updateFavoritesRecipes: PropTypes.func.isRequired,
};

export default CardRecipeFavorite;
