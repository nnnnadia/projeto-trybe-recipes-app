import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { CardWithMargin } from '../styles/StyledComponents';
import RecipesContext from '../context/RecipesContext';

function CardRecipe({ image, title, index, id, recomendation }) {
  const { isFood, handlePageOn } = useContext(RecipesContext);

  const goTo = () => {
    if (recomendation) {
      if (isFood) {
        return `/drinks/${id}`;
      }
      return `/foods/${id}`;
    }
    if (isFood) {
      return `/foods/${id}`;
    }
    return `/drinks/${id}`;
  };

  return (
    <CardWithMargin
      data-testid={
        recomendation ? `${index}-recomendation-card` : `${index}-recipe-card`
      }
      sx={ { maxWidth: 345 } }
    >
      <CardActionArea onClick={ () => handlePageOn(goTo()) }>
        <CardMedia
          component="img"
          height="140"
          image={ image }
          alt={ title }
          data-testid={
            recomendation ? `${index}-recomendation-img` : `${index}-card-img`
          }
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            data-testid={
              recomendation ? `${index}-recomendation-title` : `${index}-card-name`
            }
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardWithMargin>
  );
}

CardRecipe.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  recomendation: PropTypes.bool.isRequired,
};

export default CardRecipe;
