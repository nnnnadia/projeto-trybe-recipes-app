import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

function Foods() {
  const { recipesData, allFoods } = useContext(RecipesContext);

  const history = useHistory();
  const isFood = history.location.pathname === '/foods';

  // const MAX_ITEMS = 12;
  // const dataToShow = isFood && recipesData
  // && recipesData.length > 1 ? recipesData : allFoods;

  return (
    <div>
      <Header pageTitle="Foods" showSearchIcon />
      <Recipes />
      {/* {dataToShow.slice(0, MAX_ITEMS).map((recipe, index) => (
        <div key={ recipe.idMeal }>
          <CardRecipe
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
            index={ index }
          />
        </div>
      ))} */}
      <Footer />
    </div>
  );
}

export default Foods;
