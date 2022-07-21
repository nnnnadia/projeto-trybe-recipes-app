import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import DetailsContext from '../../context/DetailsContext';

function IngredientsList() {
  const {
    details,
    done,
    inProgress,
    indexIngredients,
    setIndexIngredients,
  } = useContext(DetailsContext);

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

  const isChecked = (index) => {
    if (indexIngredients.length > 0) {
      return indexIngredients.includes(index);
    }
    return false;
  };

  const handleChange = (index) => {
    if (!indexIngredients.includes(index)) {
      setIndexIngredients([...indexIngredients, index]);
    } else {
      const remove = indexIngredients.filter(
        (ingredient) => ingredient !== index,
      );
      setIndexIngredients(remove);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      <List dense>
        {inProgress && !done ? (
          <>
            {ingredients
              .filter((ingredient) => ingredient && ingredient.length > 0)
              .map((ingredient, index) => (
                <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
                  <label htmlFor={ ingredient }>
                    <input
                      type="checkbox"
                      id={ ingredient }
                      value={ index }
                      checked={ isChecked(index) }
                      onChange={ () => handleChange(index) }
                    />
                    {measures[index] && measures[index].length > 0
                      ? `${measures[index]} - ${ingredient}`
                      : `${ingredient}`}
                  </label>
                </div>
              ))}
          </>
        ) : (
          <>
            {ingredients
              .filter((ingredient) => ingredient && ingredient.length > 0)
              .map((ingredient, index) => (
                <ListItem
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {measures[index] && measures[index].length > 0
                    ? `${measures[index]} - ${ingredient}`
                    : `${ingredient}`}
                </ListItem>
              ))}
          </>
        ) }
      </List>
    </>
  );
}

export default IngredientsList;
