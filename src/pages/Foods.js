import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const { recipesData } = useContext(RecipesContext);
  console.log(recipesData);

  const history = useHistory();

  const isFood = history.location.pathname === '/foods';

  const MAX_ITEMS = 12;

  return (
    <div>
      <Header pageTitle="Foods" showSearchIcon />
      {isFood
        && recipesData.length > 1
        && recipesData.slice(0, MAX_ITEMS).map((recipe, index) => (
          <div key={ recipe.idMeal }>
            <CardRecipe
              image={ recipe.strMealThumb }
              title={ recipe.strMeal }
              index={ index }
            />
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Foods;
