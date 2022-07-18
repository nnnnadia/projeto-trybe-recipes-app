import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function CardRecipe({ image, title, index, id }) {
  const history = useHistory();
  const isFood = history.location.pathname === '/foods';

  return (
    <Link to={ isFood ? `/foods/${id}` : `/drinks/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ image } alt={ title } />
        <h3 data-testid={ `${index}-card-name` }>{title}</h3>
      </div>
    </Link>
  );
}

CardRecipe.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardRecipe;
