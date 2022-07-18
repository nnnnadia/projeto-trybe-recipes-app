import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function CardRecipe({ image, title, index, id, recomendation }) {
  const history = useHistory();
  const isFood = history.location.pathname === '/foods';

  return (
    <Link to={ isFood ? `/foods/${id}` : `/drinks/${id}` }>
      <div
        data-testid={
          recomendation ? `${index}-recomendation-card` : `${index}-recipe-card`
        }
      >
        <img
          data-testid={
            recomendation ? `${index}-recomendation-img` : `${index}-card-img`
          }
          src={ image }
          alt={ title }
        />
        <h3
          data-testid={
            recomendation ? `${index}-recomendation-title` : `${index}-card-name`
          }
        >
          {title}
        </h3>
      </div>
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
