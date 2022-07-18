import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ details }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const onlyIngredients = { ...details };
    const onlyMeasures = { ...details };

    Object.keys(onlyIngredients).forEach((key) => {
      if (!key.includes('strIngredient')) {
        delete onlyIngredients[key];
      }
    });

    Object.keys(onlyMeasures).forEach((key) => {
      if (!key.includes('strMeasure')) {
        delete onlyMeasures[key];
      }
    });

    setIngredients(Object.values(onlyIngredients));
    setMeasures(Object.values(onlyMeasures));
  }, [details]);

  return (
    <>
      <h4>Ingredients</h4>
      <ul>
        {ingredients
          .filter((ingredient) => ingredient && ingredient.length > 0)
          .map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {measures[index] && measures[index].length > 0
                ? `${measures[index]} - ${ingredient}`
                : `${ingredient}`}
            </li>
          ))}
      </ul>
    </>
  );
}

IngredientsList.propTypes = {
  details: PropTypes.shape().isRequired,
};

export default IngredientsList;
