import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/RecipesContext';
import { ShareButton } from '.';

function CardRecipeDone({
  id,
  type,
  image,
  doneDate,
  name,
  nationality,
  category,
  alcoholicOrNot,
  tags,
  index,
}) {
  const { handlePageOn } = useContext(RecipesContext);

  const goToDetails = () => {
    if (type === 'food') {
      return `/foods/${id}`;
    }
    return `/drinks/${id}`;
  };

  const getCaption = () => {
    const captionOptions = [nationality, category, alcoholicOrNot];
    const captionString = captionOptions.filter((option) => option !== '').join(' - ');
    return captionString;
  };

  return (
    <Card sx={ { maxWidth: 345, mb: 1, position: 'relative' } }>
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
            variant="body2"
            data-testid={ `${index}-horizontal-done-date` }
          >
            { 'Done in: ' }
            { doneDate }
          </Typography>
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
          {tags.length > 0
          && tags.map((tag) => (
            <Chip
              key={ tag }
              label={ tag }
              size="small"
              data-testid={ `${index}-${tag}-horizontal-tag` }
            />
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ShareButton type={ type } id={ id } index={ index } />
      </CardActions>
    </Card>
  );
}

CardRecipeDone.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default CardRecipeDone;
