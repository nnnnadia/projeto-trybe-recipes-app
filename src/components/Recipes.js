import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import CardRecipe from './CardRecipe';
import CategoriesOptions from './CategoriesOptions';

function Recipes() {
  const { recipesData, allFoods, allDrinks, filteredData } = useContext(RecipesContext);

  const history = useHistory();
  const isFood = history.location.pathname === '/foods';

  const MAX_ITEMS = 12;

  const dataToShow = () => {
    if (filteredData.length > 0) {
      return filteredData;
    }
    if (recipesData && recipesData.length > 1) {
      return recipesData;
    }
    if (isFood) {
      return allFoods;
    }
    return allDrinks;
  };

  return (
    <div>
      <CategoriesOptions />
      {dataToShow()
        .slice(0, MAX_ITEMS)
        .map((recipe, index) => (
          <div key={ recipe.idMeal || recipe.idDrink }>
            <CardRecipe
              image={ recipe.strMealThumb || recipe.strDrinkThumb }
              title={ recipe.strMeal || recipe.strDrink }
              index={ index }
              id={ recipe.idMeal || recipe.idDrink }
              recomendation={ false }
            />
          </div>
        ))}
    </div>
  );
}

export default Recipes;
