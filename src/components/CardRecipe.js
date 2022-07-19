import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { CardWithMargin } from '../styles/StyledComponents';

function CardRecipe({ image, title, index, id, recomendation }) {
  const history = useHistory();
  const isFood = history.location.pathname === '/foods';

  return (
    <Link to={ isFood ? `/foods/${id}` : `/drinks/${id}` }>
      <CardWithMargin
        data-testid={
          recomendation ? `${index}-recomendation-card` : `${index}-recipe-card`
        }
        sx={ { maxWidth: 345 } }
      >
        <CardActionArea>
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
    </Link>
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
