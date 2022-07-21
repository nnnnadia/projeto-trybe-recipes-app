import React, { useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import RecipesContext from '../context/RecipesContext';
import CardRecipe from './CardRecipe';
import '../styles/Recommended.css';

function Recommended() {
  const { allFoods, allDrinks, isFood } = useContext(RecipesContext);

  const MAX_ITEMS = 6;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Recommended
      </Typography>
      <div className="scrollmenu">
        <Stack direction="row" sx={ { minHeight: 'min-content' } }>
          {isFood
            ? allDrinks
              .slice(0, MAX_ITEMS)
              .map((drink, index) => (
                <CardRecipe
                  key={ drink.idDrink }
                  image={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                  id={ drink.idDrink }
                  recomendation
                />
              ))
            : allFoods
              .slice(0, MAX_ITEMS)
              .map((food, index) => (
                <CardRecipe
                  key={ food.idMeal }
                  image={ food.strMealThumb }
                  title={ food.strMeal }
                  index={ index }
                  id={ food.idMeal }
                  recomendation
                />
              ))}
        </Stack>
      </div>
    </>
  );
}

export default Recommended;
