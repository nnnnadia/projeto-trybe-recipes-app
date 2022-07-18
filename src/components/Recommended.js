import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import CardRecipe from './CardRecipe';
import '../styles/Recommended.css';

function Recommended() {
  const { allFoods, allDrinks } = useContext(RecipesContext);

  const history = useHistory();
  const isFood = history.location.pathname.includes('/foods');

  const MAX_ITEMS = 6;

  return (
    <>
      <h4>Recommended</h4>
      <div className="scrollmenu">
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
      </div>
    </>
  );
}

export default Recommended;
