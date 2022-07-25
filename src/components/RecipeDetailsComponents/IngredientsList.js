import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import DetailsContext from '../../context/DetailsContext';
import '../../styles/IngredientsList.css';

function IngredientsList() {
  const {
    details,
    indexIngredients,
    setIndexIngredients,
  } = useContext(DetailsContext);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;

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
        {pathname.includes('in-progress') ? (
          <>
            {ingredients
              .filter((ingredient) => ingredient && ingredient.length > 0)
              .map((ingredient, index) => (
                <ListItemButton
                  key={ ingredient }
                  value={ index }
                  selected={ isChecked(index) }
                  onClick={ () => handleChange(index) }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <ListItemText
                    primary={ measures[index] && measures[index].length > 0
                      ? `${measures[index]} - ${ingredient}`
                      : `${ingredient}` }
                  />
                </ListItemButton>
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
