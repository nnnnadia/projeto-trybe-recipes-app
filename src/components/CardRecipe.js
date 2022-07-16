import React from 'react';
import PropTypes from 'prop-types';

function CardRecipe({ image, title, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ image } alt={ title } />
      <h3 data-testid={ `${index}-card-name` }>{title}</h3>
    </div>
  );
}

CardRecipe.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
